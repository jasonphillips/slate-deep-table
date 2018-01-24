const Slate = require('slate');
// const { SchemaViolations } = Slate;
const { Range, List } = require('immutable');
const createCell = require('./createCell');
const createRow = require('./createRow');

const SchemaViolations = {
    ChildRequired: 'child_required',
    ChildObjectInvalid: 'child_object_invalid',
    ChildTypeInvalid: 'child_type_invalid',
    ParentTypeInvalid: 'parent_type_invalid',
}

/**
 * convenience methods used below
 */

 const insertChild = (change, ctx, type) => change.insertNodeByKey(
    ctx.node.key, 
    ctx.index,
    { object: 'block', type },
    { normalize: false },
);

const removeChild = (change, ctx) => change.removeNodeByKey(
    ctx.child.key, 
    { normalize: false }
);

const wrapWithParent = (change, ctx, type) => change.wrapBlockByKey(
    ctx.node.key, 
    type, 
    { normalize: false }
);


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
                parent: { types: [opts.typeRow] },
                nodes: [{ objects: ['block'], min: 1 }],
                normalize: (change, reason, ctx) => {
                    // enforce cells must contain blocks, insert or wrap if not
                    switch (reason) {
                        case SchemaViolations.ChildRequired:
                            return change.call(insertChild, ctx, opts.typeContent);

                        case SchemaViolations.ChildObjectInvalid:
                            // wrap non-block children with a block 
                            return change.insertNodeByKey(
                                ctx.node.key, 
                                ctx.index,
                                { object: 'block', type: opts.typeContent, nodes: ctx.node.nodes },
                                { normalize: false }
                            );

                        case SchemaViolations.ParentTypeInvalid:
                            return change.call(wrapWithParent, ctx, opts.typeRow);
                    }
                }
            },
            [opts.typeRow]: {
                parent: { types: [opts.typeTable] },
                nodes: [{ types: [opts.typeCell], objects: ['block'], min: 1 }],
                normalize: (change, reason, ctx) => {
                    // enforce rows must contain cells, drop all else 
                    switch (reason) {
                        case SchemaViolations.ChildRequired:
                            return change.call(insertChild, ctx, opts.typeCell);

                        case SchemaViolations.ChildTypeInvalid:
                            return change.call(removeChild, ctx);

                        case SchemaViolations.ParentTypeInvalid:
                            return change.call(wrapWithParent, ctx, opts.typeTable);
                    }
                }
            },
            [opts.typeTable]: {
                nodes: [{ types: [opts.typeRow], objects: ['block'], min: 1 }],
                normalize: (change, reason, ctx) => {
                    // enforce rows must contain cells, drop all else 
                    switch (reason) {
                        case SchemaViolations.ChildRequired:
                            return change.call(insertChild, ctx, opts.typeRow);

                        case SchemaViolations.ChildObjectInvalid:
                            return change.call(removeChild, ctx)
                                         .call(insertChild, ctx, opts.typeRow);

                        case SchemaViolations.ChildTypeInvalid:
                            return change.call(removeChild, ctx);
                    }
                }
            }
        }
    }

    const isRow = (node) => node.type === opts.typeRow;
    const isCell = (node) => node.type === opts.typeCell;
    const countCells = (row) => row.nodes.count(isCell);

    const validateNode = (node) => {
        if (node.object != 'block') return;
        if (node.type !== opts.typeTable) return;

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

        if (invalidRows.size === 0) return;


        return (change) => invalidRows.reduce((tr, { row, invalids, add }) => {
            tr = invalids.reduce((t, child) => {
                return t.removeNodeByKey(child.key, { normalize: false });
            }, tr);

            tr = Range(0, add).reduce(t => {
                const cell = createCell(opts);
                return t.insertNodeByKey(row.key, 0, cell, { normalize: false });
            }, tr);

            return tr;
        }, change);
    }

    return { schema, validateNode };
}

module.exports = makeSchema;
