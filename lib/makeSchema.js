const { Repeat } = require('immutable');

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
            tablesContainOnlyRows(opts),
            rowsContainRequiredColumns(opts)
        ]
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
    const EMPTY_ROW = {
        type: opts.typeRow,
        nodes: [{
            type: opts.typeCell
        }]
    };

    return {
        match (node) {
            return node.type === opts.typeTable;
        },

        validate (table) {
            const rows = table.nodes.filter(n => n.type === opts.typeRow);

            if (table.nodes.isEmpty() || rows.isEmpty()) {
                // No rows
                return {
                    nodes: [EMPTY_ROW]
                };
            } else if (table.nodes.size === rows.size) {
                // Only valid rows
                return null;
            } else {
                // Keep only rows
                return {
                    nodes: rows
                };
            }
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize (transform, node, value) {
            return transform.setNodeByKey(node.key, {
                nodes: value.nodes
            });
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
    const isCell = (node) => node.type === opts.typeRow;
    const countCells = (row) => row.nodes.count(isCell);
    const EMPTY_CELL = {
        type: opts.typeCell
    };

    return {
        match (node) {
            return node.type === opts.typeTable;
        },

        validate (table) {
            const rows = table.nodes.filter(isRow);

            // The number of column this table has
            const columns = rows.reduce(function (columns, row) {
                return Math.max(columns, countCells(row));
            }, 1); // Min 1 column


            const valid = rows.every(row => columns === countCells(row));
            if (valid) {
                return null;
            }
            // else normalize, by padding with empty cells

            const normalizedRows = rows.map(function (row) {
                // Complete missing columns
                const missing = columns - row.nodes.count();
                const missingColumns = Repeat(EMPTY_CELL, missing).toArray();

                // Replace invalid columns with empty cells
                const newCells = row.nodes
                          .concat(missingColumns)
                          .map(function fix(column) {
                              return isCell(column)
                                  ? column
                                  : EMPTY_CELL;
                          });

                return row.set(
                    'nodes',
                    newCells
                );
            });

            return {
                toUpdate: normalizedRows
            };
        },

        /**
         * Updates by key every given nodes
         * @param {List<Nodes>} value.toUpdate
         */
        normalize (transform, node, value) {
            return value.toUpdate.reduce(
                (tr, node) => tr.setNodeByKey(node.key, node),
                transform
            );
        }
    };
}

module.exports = makeSchema;
