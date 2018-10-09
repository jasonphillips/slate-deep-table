const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');

/**
 * Move selection by a {x,y} relative movement
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} x Move horizontally by x
 * @param {Number} y Move vertically by y
 * @return {Slate.Editor}
 */
function moveSelectionBy(opts, editor, x, y) {
    const { value } = editor;
    const { startBlock } = value;

    if (!TablePosition.isInCell(value, startBlock, opts)) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    const pos = TablePosition.create(value, startBlock, opts);
    const rowIndex  = pos.getRowIndex();
    const colIndex  = pos.getColumnIndex();
    const width     = pos.getWidth();
    const height    = pos.getHeight();

    const [absX, absY] = normPos(x + colIndex, y + rowIndex, width, height);

    if (absX === -1) {
        // Out of table
        return editor;
    }

    return moveSelection(opts, editor, absX, absY);
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
