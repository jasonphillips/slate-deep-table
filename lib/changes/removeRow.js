const Slate = require('slate');
const { Text } = Slate;
const TablePosition = require('../TablePosition');

/**
 * Remove current row in a table. Clear it if last remaining row
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function removeRow(opts, editor, at) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    const row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        editor.removeNodeByKey(row.key);
    }
    // If last remaining row, clear it instead
    else {
        editor.withoutNormalizing( () => {
            row.nodes.forEach((cell) => {
                // remove all children of cells
                // the schema will create an empty child content block in each cell
                cell.nodes.forEach((node) => {
                    editor.removeNodeByKey(node.key);
                });
            });
        });
    }

    return editor;
}

module.exports = removeRow;
