const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();

    state = transform
        .moveToRangeOf(cursorBlock)
        .move(6) // Cursor here: Before|After
        .apply();

    state = plugin.transforms.insertTable(state.transform()).apply();

    state = state.transform().undo().apply();

    // Back to previous cursor position
    expect(state.startBlock.text).toEqual('BeforeAfter');

    return state;
};
