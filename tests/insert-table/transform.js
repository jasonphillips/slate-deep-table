module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    return editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(6) // Cursor here: Before|After
        .command(plugin.changes.insertTable)
        .value;
};
