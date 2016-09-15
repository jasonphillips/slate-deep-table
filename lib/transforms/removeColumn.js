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
    rows = rows.map(function(row) {
        let cells = row.nodes;
        cells = cells.delete(at);

        return row.merge({ nodes: cells });
    });

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
