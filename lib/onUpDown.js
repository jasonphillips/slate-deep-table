const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./transforms/moveSelectionBy');

function onUpDown(event, data, change, opts) {
    const { state } = change;
    const direction = data.key === 'up' ? -1 : +1;
    const { startBlock } = state;
    const pos = TablePosition.create(state, startBlock, opts);

    if ((pos.isFirstRow() && direction === -1)
        || (pos.isLastRow() && direction === +1)) {
        // Let the default behavior move out of the table
        return change;

    } else {
        event.preventDefault();

        change = moveSelectionBy(
            opts, change,
            0, data.key === 'up' ? -1 : +1
        );

        return change;
    }
}

module.exports = onUpDown;
