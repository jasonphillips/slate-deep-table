const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const offset = 2;
    const transform = state.transform();
    state = transform
        .moveToRangeOf(cursorBlock)
        .move(offset)
        .apply();

    state = plugin.transforms
        .moveSelection(state.transform(), 2, 2)
        .apply();

    expect(state.startBlock.text).toEqual('Col 2, Row 2');
    const selection = state.selection;
    expect(selection.startKey).toEqual(selection.endKey);
    // Keep same offset
    expect(selection.startOffset).toEqual(offset);

    return state;
};
