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

    // Get text of current block
    const { startBlock } = state;
    const currentText = startBlock.text;

    // Create the table node
    const table = createTable(opts, columns, rows, function(x, y) {
        if (x == 0 && y == 0) return currentText;
        else return '';
    });

    return transform
        .insertBlock(table);
}

module.exports = insertTable;
