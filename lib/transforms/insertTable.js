const createTable = require('../createTable');

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Change}
 */
function insertTable(opts, change, columns = 2, rows = 2) {
    const { state } = change;

    if (!state.selection.startKey) return false;

    // Create the table node
    const fillWithEmptyText = (x, y) => '';
    const table = createTable(opts, columns, rows, fillWithEmptyText);

    const done = change
        .insertBlock(table);
    return done;
}

module.exports = insertTable;
