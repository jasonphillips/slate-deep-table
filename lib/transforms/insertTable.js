const createTable = require('../createTable');

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Transform}
 */
function insertTable(opts, transform, columns = 2, rows = 2) {
    const { state } = transform;

    if (!state.selection.startKey) return false;

    // Create the table node
    const fillWithEmptyText = (x, y) => '';
    const table = createTable(opts, columns, rows, fillWithEmptyText);

    return transform
        .insertBlock(table);
}

module.exports = insertTable;
