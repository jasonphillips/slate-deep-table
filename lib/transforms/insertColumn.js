const { List } = require('immutable');
const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function insertColumn(opts, change, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach((row) => {
        const newCell = createCell(opts);
        change = change.insertNodeByKey(row.key, at, newCell);
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, change, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;
