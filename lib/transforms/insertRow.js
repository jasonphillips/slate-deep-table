const createRow = require('../createRow');
const TablePosition = require('../TablePosition');

/**
 * Insert a new row in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function insertRow(opts, transform) {
    let { state } = transform;
    let { startBlock } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('insertRow can only be applied in a cell');
    }

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    // Create a new row
    let newRow = createRow(state, table, opts);

    // Update table by inserting the row
    let newTable = table.merge({
        nodes: table.nodes
            .insert(pos.getRowIndex() + 1, newRow)
    });

    return transform

        // Replace the table
        .setNodeByKey(table.key, newTable)

        // Move selection to new row
        .collapseToEndOf(
            newRow.nodes.get(pos.getCellIndex())
        );
}

module.exports = insertRow;
