const TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function removeTable(opts, editor, at) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    return editor
        .deselect()
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
