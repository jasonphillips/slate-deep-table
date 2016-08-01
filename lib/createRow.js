const Immutable = require('immutable');
const Slate = require('slate');
const createCell = require('./createCell');

/**
 * Create a new row in a table
 *
 * @param {Slate.State} state
 * @param {State.Block} table
 * @param {Object} opts
 * @return {State}
 */
function createRow(state, table, opts) {
    let rows = table.nodes;
    let firstRow = rows.get(0);
    let cells = firstRow.nodes;

    let cellsToInsert = Immutable.Range(0, cells.size)
        .map(i => createCell(opts.typeCell))
        .toList();

    let rowToInsert = Slate.Block.create({
        type: opts.typeRow,
        nodes: cellsToInsert
    });

    return rowToInsert;
}

module.exports = createRow;
