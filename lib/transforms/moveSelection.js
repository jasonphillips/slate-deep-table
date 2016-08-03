const TablePosition = require('../TablePosition');

/**
 * Normalize position in a table
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Array<Number>}
 */
function calculPos(x, y, width, height) {
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
function moveSelection(opts, transform, x, y, xabsolute, yabsolute) {
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

    if (!xabsolute) x += cellIndex;
    if (!yabsolute) y += rowIndex;

    [x, y] = calculPos(x, y, width, height);
    if (x < 0) {
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
