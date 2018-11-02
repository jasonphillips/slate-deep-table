const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');
const insertRow = require('./changes/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Editor} editor
 * @return {Slate.Editor}
 */
function selectAllText(editor) {
    const { value } = editor;
    const { startBlock } = value;

    return editor.moveToRangeOfNode(startBlock);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, editor, opts) {
    const { value } = editor;
    event.preventDefault();
    const direction = (event.shiftKey ? -1 : +1);

    // Create new row if needed
    const { startBlock } = value;
    const pos = TablePosition.create(value, startBlock, opts);

    if (pos.isFirstCell() && direction === -1) {
        editor = insertRow(opts, editor, 0);
    } else if (pos.isLastCell() && direction === 1) {
        editor = insertRow(opts, editor);
    }

    // Move
    editor = moveSelectionBy(opts, editor, direction, 0);

    // Select all cell.
    return selectAllText(editor);
}

module.exports = onTab;
