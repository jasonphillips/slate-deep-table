const TablePosition = require('../TablePosition');

/**
 * Delete current row in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function deleteRow(opts, transform) {
    let { state } = transform;
    let { startBlock } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('deleteRow can only be applied in a cell');
    }

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;
    let currentIndex = pos.getRowIndex();

    // Update table by removing the row
    let newTable = table.merge({
        nodes: table.nodes
            .delete(currentIndex)
    });

    let newRow = newTable.nodes.get(currentIndex);

    return transform

        // Replace the table
        .setNodeByKey(table.key, newTable)

        // Move selection to new row
        .collapseToEndOf(
            newRow.nodes.get(pos.getCellIndex())
        );
}

module.exports = deleteRow;
