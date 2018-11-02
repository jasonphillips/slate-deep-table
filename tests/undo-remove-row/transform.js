module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .removeRow()
        .undo()
        .value;

    return value;
};
