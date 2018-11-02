const createRow = require('../createRow');
const TablePosition = require('../TablePosition');

/**
 * Insert a new row in current table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @param {Function} textGetter
 * @return {Slate.Editor}
 */
function insertRow(opts, editor, at, textGetter) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    // Create a new row with the right count of cells
    const firstRow = table.nodes.get(0);
    const newRow = createRow(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return editor

        .insertNodeByKey(table.key, at, newRow)

        .moveToEndOfNode(
            newRow.nodes.get(pos.getColumnIndex())
        );
}

module.exports = insertRow;
