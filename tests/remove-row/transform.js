module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    return editor
        .moveToRangeOfNode(cursorBlock)
        .command(plugin.changes.removeRow)
        .value;
};
