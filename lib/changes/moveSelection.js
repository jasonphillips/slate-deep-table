const TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Change}
 */
function moveSelection(opts, change, x, y) {
    const { value } = change;
    let { startBlock, startOffset } = value;

    if (!TablePosition.isInCell(value, startBlock, opts)) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.length) {
        startOffset = cell.length;
    }

    return change
        .collapseToEndOf(cell)
        .moveOffsetsTo(startOffset);
}

module.exports = moveSelection;
