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
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    return change
        .deselect()
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
