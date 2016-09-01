const TablePosition = require('../TablePosition');
const createCell = require('../createCell');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function insertColumn(opts, transform, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    let rows = table.nodes;

    // Add a new cell to each row
    rows = rows.map(function(row) {
        let cells = row.nodes;
        const newCell = createCell(opts.typeCell);

        cells = cells.insert(at, newCell);

        return row.merge({ nodes: cells });
    });

    // Update table
    const newTable = table.merge({
        nodes: rows
    });

    // Replace the table
    return transform
        .setNodeByKey(table.key, newTable);
}

module.exports = insertColumn;
