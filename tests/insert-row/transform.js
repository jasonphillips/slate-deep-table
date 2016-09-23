module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();
    state = transform.moveToRangeOf(cursorBlock).apply();

    return plugin.transforms.insertRow(state.transform())
        .apply();
};
