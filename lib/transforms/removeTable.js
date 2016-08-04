const TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeTable(opts, transform, at) {
    let { state } = transform;
    let { startBlock } = state;

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    return transform
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
