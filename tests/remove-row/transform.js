module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    return editor
        .moveToRangeOfNode(cursorBlock)
        .removeRow()
        .value;
};
