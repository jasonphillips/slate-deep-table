const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');

/**
 * Move selection by a {x,y} relative movement
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} x Move horizontally by x
 * @param {Number} y Move vertically by y
 * @return {Slate.Change}
 */
function moveSelectionBy(opts, change, x, y) {
    const { state } = change;
    const { startBlock } = state;

    if (!TablePosition.isInCell(state, startBlock, opts)) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    const pos = TablePosition.create(state, startBlock, opts);
    const rowIndex  = pos.getRowIndex();
    const colIndex  = pos.getColumnIndex();
    const width     = pos.getWidth();
    const height    = pos.getHeight();

    const [absX, absY] = normPos(x + colIndex, y + rowIndex, width, height);

    if (absX === -1) {
        // Out of table
        return change;
    }

    return moveSelection(opts, change, absX, absY);
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
