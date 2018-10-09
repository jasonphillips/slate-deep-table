const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');
const insertRow = require('./changes/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    const { value } = change;
    const { startBlock } = value;

    return change.moveToRangeOfNode(startBlock);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, change, opts) {
    const { value } = change;
    event.preventDefault();
    const direction = (event.shiftKey ? -1 : +1);

    // Create new row if needed
    const { startBlock } = value;
    const pos = TablePosition.create(value, startBlock, opts);

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
