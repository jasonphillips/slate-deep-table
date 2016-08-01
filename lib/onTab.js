const moveSelection = require('./transforms/moveSelection');

/**
 * Select all text of current block.
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function selectAllText(transform) {
    let { state } = transform;
    let { startBlock } = state;

    return transform
        .moveToOffsets(0)
        .extendForward(startBlock.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, data, state, opts) {
    let transform = state.transform();
    let newTransform = moveSelection(opts, transform, data.isShift? -1 : +1, 0);

    if (newTransform === transform) {
        return;
    }

    event.preventDefault();

    // We have to apply the transform so that "selectAllText"
    // can have access to an updated "startBlock"
    newTransform = newTransform
        .apply()
        .transform();

    return selectAllText(newTransform)
        .apply();
}

module.exports = onTab;
