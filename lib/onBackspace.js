const Immutable = require('immutable');
const Slate = require('slate');

function onBackspace(event, data, state, opts) {
    const { startBlock, startOffset,
        isCollapsed, endBlock } = state;

    // If a cursor is collapsed at the start of the block, do nothing
    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return state;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    const { blocks, focusBlock } = state;
    const transform = blocks.reduce(function(transform, block) {
        if (block.type !== opts.typeCell) {
            return transform;
        }

        return transform.setNodeByKey(
            block.key, {
                nodes: Immutable.List([
                    Slate.Text.create()
                ])
            }
        );
    }, state.transform());

    // Clear selected cells
    return transform
        .collapseToStartOf(focusBlock)
        .apply();
}

module.exports = onBackspace;
