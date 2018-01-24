const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');

function onUpDown(event, change, opts) {
    const { value } = change;
    const direction = event.key === 'ArrowUp' ? -1 : +1;
    const { startBlock } = value;
    const pos = TablePosition.create(value, startBlock, opts);

    if ((pos.isFirstRow() && direction === -1)
        || (pos.isLastRow() && direction === +1)) {
        // Let the default behavior move out of the table
        return change;

    } else {
        event.preventDefault();

        change = moveSelectionBy(
            opts, change,
            0, event.key === 'ArrowUp' ? -1 : +1
        );

        return change;
    }
}

module.exports = onUpDown;
