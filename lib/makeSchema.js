const Slate = require('slate');
// const { SchemaViolations } = Slate;
const { Range, List } = require('immutable');
const createCell = require('./createCell');
const createRow = require('./createRow');

const SchemaViolations = {
    ChildRequired: 'child_min_invalid',
    ChildObjectInvalid: 'child_object_invalid',
    ChildTypeInvalid: 'child_type_invalid',
    ParentTypeInvalid: 'parent_type_invalid',
}

/**
 * convenience methods used below
 */

const insertChild = (editor, error, type) => {
    return editor.insertNodeByKey(
        error.node.key,
        error.index,
        { object: 'block', type }
    );
};

const removeChild = (editor, error) => {
    return editor.removeNodeByKey(error.child.key);
};

const wrapWithParent = (editor, error, type) => {
    return editor.wrapBlockByKey(
        error.node.key,
        type
    );
};


/**
 * Create a schema for tables
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @param {String} opts.typeContent The default type of content blocks in cells
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    const schema = {
        blocks: {
            [opts.typeCell]: {
                parent: { type: opts.typeRow /* object: block in here stops it invalidating them, why? maybe the rules are OR */},
                nodes: [{
                    match: { object: 'block' },
                    min: 1
                }],
                normalize: (editor, error) => { // reason, ctx

                    // enforce cells must contain blocks, insert or wrap if not
                    switch (error.code) {
                        case SchemaViolations.ChildRequired:
                            return editor.command(insertChild, error, opts.typeContent);

                        case SchemaViolations.ChildObjectInvalid:
                            // wrap non-block children with a block
                            return editor.replaceNodeByKey(
                                error.child.key,
                                {
                                    object: 'block', 
                                    type: opts.typeContent, 
                                    nodes: error.node.mapDescendants(n => n.regenerateKey()).nodes 
                                }
                            );

                        case SchemaViolations.ParentTypeInvalid:
                            return editor.command(wrapWithParent, error, opts.typeRow);
                    }
                }
            },
            [opts.typeRow]: {
                parent: { type: opts.typeTable },
                nodes: [{
                    match: {object: 'block', type: opts.typeCell},
                    min: 1
                }],
                normalize: (editor, error) => {

                    // enforce rows must contain cells, drop all else
                    switch (error.code) {
                        case SchemaViolations.ChildRequired:
                            return editor.command(insertChild, error, opts.typeCell);

                        case SchemaViolations.ChildObjectInvalid:
                            return editor.replaceNodeByKey(
                                error.child.key,
                                {object: 'block', type: opts.typeCell}
                            );

                        case SchemaViolations.ChildTypeInvalid:
                            // i wonder why we remove it instead of converting it to a cell.
                            return editor.command(removeChild, error);

                        case SchemaViolations.ParentTypeInvalid:
                            return editor.command(wrapWithParent, error, opts.typeTable);
                    }
                }
            },
            [opts.typeTable]: {
                nodes: [{
                    match: {object: 'block', type: opts.typeRow},
                    min: 1
                }],
                normalize: (editor, error) => {

                    // enforce rows must contain cells, drop all else
                    switch (error.code) {
                        case SchemaViolations.ChildRequired:
                            return editor.command(insertChild, error, opts.typeRow);

                        case SchemaViolations.ChildObjectInvalid:
                            return editor.command(removeChild, error)
                                         .command(insertChild, error, opts.typeRow);

                        case SchemaViolations.ChildTypeInvalid:
                            return editor.command(removeChild, error);
                    }
                }
            }
        }
    }

    const isRow = (node) => node.type === opts.typeRow;
    const isCell = (node) => node.type === opts.typeCell;
    const countCells = (row) => row.nodes.count(isCell);

    const normalizeNode = (node, editor, next) => {

        if (node.object != 'block') return next();
        if (node.type !== opts.typeTable) return next();

        const table = node;
        const rows = table.nodes.filter(isRow);

        // The number of column this table has
        const columns = rows.reduce((count, row) => {
            return Math.max(count, countCells(row));
        }, 1); // Min 1 column

        const invalidRows = rows
            .map(row => {
                const cells = countCells(row);
                const invalids = row.nodes.filterNot(isCell);

                // Row is valid: right count of cells and no extra node
                if (invalids.isEmpty() && cells === columns) {
                    return null;
                }

                // Otherwise, remove the invalids and append the missing cells
                return {
                    row,
                    invalids,
                    add: (columns - cells)
                };
            })
            .filter(Boolean);

        if (invalidRows.size === 0) return next();

            return (editor) => invalidRows.reduce((tr, { row, invalids, add }) => {

                tr = invalids.reduce((t, child) => {
                    return t.removeNodeByKey(child.key);
                }, tr);

                tr = Range(0, add).reduce(t => {
                    const cell = createCell(opts);
                    return t.insertNodeByKey(row.key, 0, cell);
                }, tr);

                return tr;
            }, editor);
    }

    return { schema, normalizeNode };
}

module.exports = makeSchema;
