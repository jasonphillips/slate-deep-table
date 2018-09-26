const Slate = require('slate');
const { Text } = Slate;
const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        change.withoutNormalizing( () => {
            rows.forEach((row) => {
            const cell = row.nodes.get(at);
                change.removeNodeByKey(cell.key);
            });
        });
    }
    // If last column, clear text in cells instead
    else {
        change.withoutNormalizing( () => {
            rows.forEach((row) => {
                row.nodes.forEach((cell) => {
                // remove all children of cells
                // the schema will create an empty child content block in each cell
                    cell.nodes.forEach((node) => {
                        change.removeNodeByKey(node.key);
                    });
                });
            });
        });
    }

    // Replace the table
    return change;
}

module.exports = removeColumn;
