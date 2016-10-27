const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function insertColumn(opts, transform, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    table.nodes.forEach(function(row) {
        const newCell = createCell(opts.typeCell);
        transform.insertNodeByKey(row.key, at, newCell);
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, transform, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;
