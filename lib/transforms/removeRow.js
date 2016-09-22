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

    // Update table by removing the row
    let newTable;
    if (pos.getHeight() > 1) {
        newTable = table.merge({
            nodes: table.nodes.delete(at)
        });
    }
    // If last remaining row, clear it instead
    else {
        newTable = table.merge({
            nodes: table.nodes.map(function(row) {
                return row.merge({
                    nodes: row.nodes.map(
                        cell => cell.set('nodes', cell.nodes.clear())
                    )
                });
            })
        });
    }

    return transform
        .unsetSelection()
        // Replace the table
        .setNodeByKey(table.key, newTable);
}

module.exports = removeRow;
