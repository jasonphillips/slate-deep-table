const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();

    state = transform.moveToRangeOf(cursorBlock).apply();

    state = plugin.transforms.removeTable(state.transform()).apply();

    state = state.transform().undo().apply();

    // Back to previous cursor position
    expect(state.startBlock.text).toEqual('Col 1, Row 1');

    return state;
};
