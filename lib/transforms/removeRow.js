const TablePosition = require('../TablePosition');

/**
 * Remove current row in a table. Clear it if last remaining row
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeRow(opts, transform, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    const row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        transform.removeNodeByKey(row.key);
    }
    // If last remaining row, clear it instead
    else {
        row.nodes.forEach((cell) => {
            cell.nodes.forEach((node) => {
                transform.removeNodeByKey(node.key);
            });
        });
    }

    return transform;
}

module.exports = removeRow;
