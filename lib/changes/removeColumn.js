const Slate = require('slate');
const { Text } = Slate;
const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function removeColumn(opts, editor, at) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        editor.withoutNormalizing( () => {
            rows.forEach((row) => {
            const cell = row.nodes.get(at);
                editor.removeNodeByKey(cell.key);
            });
        });
    }
    // If last column, clear text in cells instead
    else {
        editor.withoutNormalizing( () => {
            rows.forEach((row) => {
                row.nodes.forEach((cell) => {
                // remove all children of cells
                // the schema will create an empty child content block in each cell
                    cell.nodes.forEach((node) => {
                        editor.removeNodeByKey(node.key);
                    });
                });
            });
        });
    }

    // Replace the table
    return editor;
}

module.exports = removeColumn;
