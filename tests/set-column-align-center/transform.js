module.exports = function(plugin, state) {
    let transform = state.transform();

    const cursorBlock = state.document.getDescendant('_cursor_1');
    state = transform.moveToRangeOf(cursorBlock).apply();
    transform = plugin.transforms.setColumnAlign(state.transform(), 'center');

    const cursorBlock2 = state.document.getDescendant('_cursor_2');
    state = transform.moveToRangeOf(cursorBlock2).apply();
    return plugin.transforms.setColumnAlign(state.transform(), 'right').apply();
};
