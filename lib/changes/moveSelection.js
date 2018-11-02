const TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Editor}
 */
function moveSelection(opts, editor, x, y) {
    const { value } = editor;
    let { startBlock } = value;
    let startOffset = value.selection.start.offset;

    if (!TablePosition.isInCell(value, startBlock, opts)) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);
    
    // Calculate new offset
    const cellTextLength = cell.text.length;
    if (startOffset > cellTextLength) {
        startOffset = cellTextLength;
    }

    return editor.moveTo(cell.getFirstText().key, startOffset);
}

module.exports = moveSelection;
