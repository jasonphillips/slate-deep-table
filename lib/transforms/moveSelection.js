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
    const { state } = transform;
    let { startBlock, startOffset } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    const rowIndex  = pos.getRowIndex();
    const colIndex = pos.getColumnIndex();
    const width     = pos.getWidth();
    const height    = pos.getHeight();

    if (!xabsolute) x += colIndex;
    if (!yabsolute) y += rowIndex;

    [x, y] = calculPos(x, y, width, height);
    if (x < 0) {
        return transform;
    }

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // Calcul new offset
    if (startOffset > cell.length) {
        startOffset = cell.length;
    }

    return transform
        .collapseToEndOf(cell)
        .moveToOffsets(startOffset);
}

module.exports = moveSelection;
