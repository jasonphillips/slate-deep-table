const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function deleteColumn(opts, transform, at) {
    let { state } = transform;
    let { startBlock } = state;

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    let rows = table.nodes;

    // Add a new cell to each row
    rows = rows.map(function(row) {
        let cells = row.nodes;
        cells = cells.delete(at);

        return row.merge({ nodes: cells });
    });

    // Update table
    let newTable = table.merge({
        nodes: rows
    });

    // Replace the table
    return transform
        .setNodeByKey(table.key, newTable);
}

module.exports = deleteColumn;
