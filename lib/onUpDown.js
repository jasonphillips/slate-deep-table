const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./transforms/moveSelectionBy');

function onUpDown(event, data, state, opts) {

    const direction = data.key === 'up' ? -1 : +1;
    const { startBlock } = state;
    const pos = TablePosition.create(state, startBlock, opts);

    if ((pos.isFirstRow() && direction === -1)
        || (pos.isLastRow() && direction === +1)) {
        // Let the default behavior move out of the table
        return state;

    } else {
        event.preventDefault();

        let transform = state.transform();
        transform = moveSelectionBy(
            opts, transform,
            0, data.key === 'up' ? -1 : +1
        );

        return transform.apply();
    }
}

module.exports = onUpDown;
