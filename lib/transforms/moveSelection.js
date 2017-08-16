const TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Transform}
 */
function moveSelection(opts, transform, x, y) {
    const { state } = transform;
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

    return transform
        .collapseToEndOf(cell)
        .moveOffsetsTo(startOffset);
}

module.exports = moveSelection;
