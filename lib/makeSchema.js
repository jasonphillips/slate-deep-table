const Slate = require('slate');
const { Range, List } = require('immutable');
const createAlign = require('./createAlign');

/**
 * Create a schema for tables
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    return {
        rules: [
            noBlocksWithinCell(opts),
            cellsWithinTable(opts),
            rowsWithinTable(opts),
            tablesContainOnlyRows(opts),
            rowsContainRequiredColumns(opts),
            tableContainAlignData(opts)
        ]
    };
}

/**
 * Rule to enforce cells only contain inlines or text.
 * It unwrap blocks in cell blocks
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to enforce cells only contain inlines or text.
 */
function noBlocksWithinCell(opts) {
    return {
        match(node) {
            return node.kind == 'block' && node.type == opts.typeCell;
        },

        // Find nested blocks
        validate(node) {
            const nestedBlocks = node.nodes.filter(
                child => child.kind === 'block'
            );

            return nestedBlocks.size > 0 ? nestedBlocks : null;
        },

        // If any, unwrap all nested blocks
        normalize(transform, node, nestedBlocks) {
            nestedBlocks.forEach(
                block => block.nodes.forEach((grandChild) => {
                    transform.unwrapNodeByKey(grandChild.key);
                })
            );
        }
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure cells are always surrounded by a row.
 */
function cellsWithinTable(opts) {
    return {
        match(node) {
            return (node.kind === 'document' || node.kind === 'block')
                && node.type !== opts.typeRow;
        },

        // Find child cells nodes not in a row
        validate(node) {
            const cells = node.nodes.filter((n) => {
                return n.type === opts.typeCell;
            });

            if (cells.isEmpty()) return;

            return {
                cells
            };
        },

        // If any, wrap all cells in a row block
        normalize(transform, node, { cells }) {
            transform = cells.reduce((tr, cell) => {
                return tr.wrapBlockByKey(cell.key, opts.typeRow, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure rows are always surrounded by a table.
 */
function rowsWithinTable(opts) {
    return {
        match(node) {
            return (node.kind === 'document' || node.kind === 'block')
                && node.type !== opts.typeTable;
        },

        // Find child cells nodes not in a row
        validate(node) {
            const rows = node.nodes.filter((n) => {
                return n.type === opts.typeRow;
            });

            if (rows.isEmpty()) return;

            return {
                rows
            };
        },

        // If any, wrap all cells in a row block
        normalize(transform, node, { rows }) {
            transform = rows.reduce((tr, row) => {
                return tr.wrapBlockByKey(row.key, {
                    type: opts.typeTable,
                    data: {
                        align: createAlign(row.nodes.size)
                    }
                }, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures tables only contain rows and
 * at least one.
 */
function tablesContainOnlyRows(opts) {
    const isRow = (node) => node.type === opts.typeRow;

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            // Figure out invalid rows
            const invalids = table.nodes.filterNot(isRow);

            // Figure out valid rows
            const add = invalids.size === table.nodes.size ? [makeEmptyRow(opts)] : [];

            if (invalids.isEmpty() && add.length === 0) {
                return null;
            }

            return {
                invalids,
                add
            };
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize(transform, node, {invalids = [], add = []}) {
            // Remove invalids
            transform = invalids.reduce((t, child) => {
                return t.removeNodeByKey(child.key, { normalize: false });
            }, transform);

            // Add valids
            transform = add.reduce((t, child) => {
                return t.insertNodeByKey(node.key, 0, child);
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
function rowsContainRequiredColumns(opts) {
    const isRow = (node) => node.type === opts.typeRow;
    const isCell = (node) => node.type === opts.typeCell;
    const countCells = (row) => row.nodes.count(isCell);

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const rows = table.nodes.filter(isRow);

            // The number of column this table has
            const columns = rows.reduce((count, row) => {
                return Math.max(count, countCells(row));
            }, 1); // Min 1 column


            // else normalize, by padding with empty cells
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

            return invalidRows.size > 0 ? invalidRows : null;
        },

        /**
         * Updates by key every given nodes
         * @param {List<Nodes>} value.toUpdate
         */
        normalize(transform, node, rows) {
            return rows.reduce((tr, { row, invalids, add }) => {
                tr = invalids.reduce((t, child) => {
                    return t.removeNodeByKey(child.key, { normalize: false });
                }, tr);

                tr = Range(0, add).reduce(t => {
                    const cell = makeEmptyCell(opts);
                    return t.insertNodeByKey(row.key, 0, cell, { normalize: false });
                }, tr);

                return tr;
            }, transform);
        }
    };
}


/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures table node has all align data
 */
function tableContainAlignData(opts) {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const align = table.data.get('align', List());
            const row = table.nodes.first();
            const columns = row.nodes.size;

            return align.length == columns ? null : { align, columns };
        },

        /**
         * Updates by key the table to add the data
         * @param {Map} align
         * @param {Number} columns
         */
        normalize(transform, node, { align, columns }) {
            return transform.setNodeByKey(node.key, {
                data: { align: createAlign(columns, align) }
            }, { normalize: false });
        }
    };
}

function makeEmptyCell(opts) {
    return Slate.Block.create({
        type: opts.typeCell
    });
}

function makeEmptyRow(opts) {
    return Slate.Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}


module.exports = makeSchema;
