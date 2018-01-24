module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');

    return value.change()
        .moveToRangeOf(cursorBlock)
        .move(6) // Cursor here: Before|After
        .call(plugin.changes.insertTable)
        .value;
};
