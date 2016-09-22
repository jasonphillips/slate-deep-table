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

    let rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows = rows.map(function(row) {
            const cells = row.nodes.delete(at);

            return row.merge({ nodes: cells });
        });
    }
    // If last column, clear it instead
    else {
        rows = rows.map(function(row) {
            const clearedCells = row.nodes.map(
                cell => cell.set('nodes', cell.nodes.clear())
            );

            return row.merge({ nodes: clearedCells });
        });
    }

    // Update table
    const newTable = table.merge({
        nodes: rows
    });

    // Replace the table
    return transform
        .unsetSelection()
        .setNodeByKey(table.key, newTable);
}

module.exports = removeColumn;
