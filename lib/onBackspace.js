
function onBackspace(event, data, state, opts) {
    const { startBlock, startOffset,
        isCollapsed, endBlock } = state;

    // If a cursor is collapsed at the start of the block, do nothing
    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return state;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the blocks
    if (startBlock != endBlock) {
        event.preventDefault();

        // TODO
    }
}

module.exports = onBackspace;
