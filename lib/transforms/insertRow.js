const createRow = require('../createRow');
const TablePosition = require('../TablePosition');

/**
 * Insert a new row in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {Function} textGetter
 * @return {Slate.Transform}
 */
function insertRow(opts, transform, at, textGetter) {
    let { state } = transform;
    let { startBlock } = state;

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    // Create a new row with the right count of cells
    let firstRow = table.nodes.get(0);
    let newRow = createRow(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    // Update table by inserting the row
    let newTable = table.merge({
        nodes: table.nodes
            .insert(at, newRow)
    });

    return transform

        // Replace the table
        .setNodeByKey(table.key, newTable)

        // Move selection to new row
        .collapseToEndOf(
            newRow.nodes.get(pos.getColumnIndex())
        );
}

module.exports = insertRow;
