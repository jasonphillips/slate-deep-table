const TablePosition = require('../TablePosition');

/**
 * Delete current row in a table
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
    const newTable = table.merge({
        nodes: table.nodes
            .delete(at)
    });

    return transform
        .unsetSelection()
        // Replace the table
        .setNodeByKey(table.key, newTable);
}

module.exports = removeRow;
