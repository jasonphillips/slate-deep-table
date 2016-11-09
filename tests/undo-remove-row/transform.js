
module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();

    state = transform.moveToRangeOf(cursorBlock).apply();

    state = plugin.transforms.removeRow(state.transform()).apply();

    state = state.transform().undo().apply();

    return state;
};
