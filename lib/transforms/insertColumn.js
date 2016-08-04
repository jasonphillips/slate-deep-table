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
    let { state } = transform;
    let { startBlock } = state;

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    let rows = table.nodes;

    // Add a new cell to each row
    rows = rows.map(function(row) {
        let cells = row.nodes;
        let newCell = createCell(opts.typeCell);

        cells = cells.insert(at, newCell);

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

module.exports = insertColumn;
