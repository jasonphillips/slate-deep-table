module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');

    return value.change()
        .moveToRangeOfNode(cursorBlock)
        .moveForward(6) // Cursor here: Before|After
        .call(plugin.changes.insertTable)
        .value;
};
