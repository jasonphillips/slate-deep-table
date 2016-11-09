const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeColumn(opts, transform, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach((row) => {
            const cell = row.nodes.get(at);
            transform.removeNodeByKey(cell.key);
        });

        // Update alignment
        let align = List(table.data.get('align'));
        align = align.delete(at);
        transform = transform.setNodeByKey(table.key, {
            data: { align }
        });
    }
    // If last column, clear text in cells instead
    else {
        rows.forEach((row) => {
            row.nodes.forEach((cell) => {
                cell.nodes.forEach((node) => {
                    // We clear the texts in the cells
                    transform.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return transform;
}

module.exports = removeColumn;
