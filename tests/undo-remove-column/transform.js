module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .removeColumn()
        .undo()
        .value;

    return value;
};
