const TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeTable(opts, change, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;

    return change
        .deselect()
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
