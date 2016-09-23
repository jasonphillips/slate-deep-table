module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();
    state = transform
        .moveToRangeOf(cursorBlock)
        .moveForward(6) // Cursor here: Before|After
        .apply();

    return plugin.transforms.insertTable(state.transform())
        .apply();
};
