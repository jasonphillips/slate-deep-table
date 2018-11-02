const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');

function onUpDown(event, editor, opts) {
    const { value } = editor;
    const direction = event.key === 'ArrowUp' ? -1 : +1;
    const { startBlock } = value;
    const pos = TablePosition.create(value, startBlock, opts);

    if ((pos.isFirstRow() && direction === -1)
        || (pos.isLastRow() && direction === +1)) {
        // Let the default behavior move out of the table
        return editor;

    } else {
        event.preventDefault();

        editor = moveSelectionBy(
            opts, editor,
            0, event.key === 'ArrowUp' ? -1 : +1
        );

        return editor;
    }
}

module.exports = onUpDown;
