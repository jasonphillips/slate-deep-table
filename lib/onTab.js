const moveSelection = require('./transforms/moveSelection');
const insertRow = require('./transforms/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function selectAllText(transform) {
    const { state } = transform;
    const { startBlock } = state;

    return transform
        .moveToOffsets(0)
        .extendForward(startBlock.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, data, state, opts) {
    const direction = (data.isShift ? -1 : +1);
    const transform = state.transform();
    let newTransform = moveSelection(opts, transform, direction, 0);

    // Is outside the table
    if (newTransform === transform) {
        if (direction > 0) {
            newTransform = insertRow(opts, transform);
        } else {
            newTransform = insertRow(opts, transform, 0);
        }

        newTransform = moveSelection(opts, newTransform, direction, 0);
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
