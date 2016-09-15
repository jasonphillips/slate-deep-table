const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');

/**
 * Move selection by a {x,y} relative movement
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} x Move horizontally by x
 * @param {Number} y Move vertically by y
 * @return {Slate.Transform}
 */
function moveSelectionBy(opts, transform, x, y) {
    const { state } = transform;
    const { startBlock } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    const pos = TablePosition.create(state, startBlock);
    const rowIndex  = pos.getRowIndex();
    const colIndex  = pos.getColumnIndex();
    const width     = pos.getWidth();
    const height    = pos.getHeight();

    const [absX, absY] = normPos(x + colIndex, y + rowIndex, width, height);

    if (absX === -1) {
        // Out of table
        return transform;
    }

    return moveSelection(opts, transform, absX, absY);
}

/**
 * Normalize position in a table. If x is out of the row, update y accordingly
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Array<Number>} [-1, -1] if the new selection is out of table
 */
function normPos(x, y, width, height) {
    if (x < 0) {
        x = (width - 1);
        y--;
    }

    if (y < 0) {
        return [-1, -1];
    }

    if (x >= width) {
        x = 0;
        y++;
    }

    if (y >= height) {
        return [-1, -1];
    }

    return [x, y];
}

module.exports = moveSelectionBy;
