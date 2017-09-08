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
    const { state } = change;
    let { startBlock, startOffset } = state;

    if (!TablePosition.isInCell(state, startBlock, opts)) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.length) {
        startOffset = cell.length;
    }

    console.warn(cell);

    return change
        .collapseToEndOf(cell)
        .moveOffsetsTo(startOffset);
}

module.exports = moveSelection;
