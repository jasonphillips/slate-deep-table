const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./transforms/moveSelectionBy');
const insertRow = require('./transforms/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    const { state } = change;
    const { startBlock } = state;

    return change
        .moveOffsetsTo(0)
        .extend(startBlock.textlength);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, data, change, opts) {
    const { state } = change;
    event.preventDefault();
    const direction = (data.isShift ? -1 : +1);

    // Create new row if needed
    const { startBlock } = state;
    const pos = TablePosition.create(state, startBlock, opts);
    if (pos.isFirstCell() && direction === -1) {
        change = insertRow(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        change = insertRow(opts, change);
    }

    // Move
    change = moveSelectionBy(opts, change, direction, 0);

    // Select all cell.
    return selectAllText(change);
}

module.exports = onTab;
