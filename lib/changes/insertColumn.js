const { List } = require('immutable');
const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function insertColumn(opts, editor, at) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    editor.withoutNormalizing( () => {
        table.nodes.forEach((row) => {
            const newCell = createCell(opts);
            editor.insertNodeByKey(row.key, at, newCell);
        });
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, editor, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;
