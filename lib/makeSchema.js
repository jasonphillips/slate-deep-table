const Slate = require('slate');
const { Range, List } = require('immutable');
const createCell = require('./createCell');
const createRow = require('./createRow');

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
            AlwaysBlocksWithinCell(opts),
            cellsWithinTable(opts),
            rowsWithinTable(opts),
            tablesContainOnlyRows(opts),
            rowsContainOnlyCells(opts),
            rowsContainRequiredColumns(opts),
        ]
    };
}

/**
 * Rule to enforce cells contain at least one block.
 * Wraps unwrapped text in cell blocks
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @param {String} opts.typeContent The type of content blocks
 * @return {Object} A rule to enforce cells must contain blocks.
 */
function AlwaysBlocksWithinCell(opts) {
    return {
        match(node) {
            return node.kind == 'block' && node.type == opts.typeCell;
        },

        // Find unwrapped test
        validate(node) {
            const toWrap = node.nodes.filter(
                child => child.kind !== 'block'
            );

            return toWrap.size > 0 ? toWrap : null;
        },

        // If any, wrap in blocks
        normalize(transform, node, toWrap) {
            transform = toWrap.reduce((tr, unwrapped) =>
                tr.wrapBlockByKey(unwrapped.key, opts.typeContent, { normalize: false })
            , transform);

            return transform;
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
 * @return {Object} A rule that ensures rows only contain cells and
 * at least one.
 */
function rowsContainOnlyCells(opts) {
    const isCell = (node) => node.type === opts.typeCell;

    return {
        match(node) {
            return node.type === opts.typeRow;
        },

        validate(row) {
            // Figure out invalid cells
            const invalids = row.nodes.filterNot(isCell);

            // Figure out valid rows
            const add = invalids.size === row.nodes.size ? [makeEmptyCell(opts)] : [];

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

function makeEmptyCell(opts) {
    return createCell(opts);
}

function makeEmptyRow(opts) {
    return createRow(opts, 1);
}


module.exports = makeSchema;
