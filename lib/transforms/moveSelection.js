const TablePosition = require('../TablePosition');

/**
 * Move selection to an {x,y}
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean} absolute
 * @return {Slate.Transform}
 */
function moveSelection(opts, transform, x, y, absolute) {
    let { state } = transform;
    let { startBlock, startOffset } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    let pos = TablePosition.create(state, startBlock);
    let { table } = pos;

    let rowIndex  = pos.getRowIndex();
    let cellIndex = pos.getCellIndex();
    let width     = pos.getWidth();
    let height    = pos.getHeight();

    if (!absolute) {
        x += cellIndex;
        y += rowIndex;
    }

    if (x < 0 || y < 0) {
        return transform;
    }

    if (x >= width) {
        x = 0;
        y++;
    }

    if (y >= height) {
        return transform;
    }

    let row  = table.nodes.get(y);
    let cell = row.nodes.get(x);

    // Calcul new offset
    if (startOffset > cell.length) {
        startOffset = cell.length;
    }

    return transform
        .collapseToEndOf(cell)
        .moveToOffsets(startOffset);
}

module.exports = moveSelection;
