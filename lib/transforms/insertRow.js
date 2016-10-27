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
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    // Create a new row with the right count of cells
    const firstRow = table.nodes.get(0);
    const newRow = createRow(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return transform

        .insertNodeByKey(table.key, at, newRow)

        .collapseToEndOf(
            newRow.nodes.get(pos.getColumnIndex())
        );
}

module.exports = insertRow;
