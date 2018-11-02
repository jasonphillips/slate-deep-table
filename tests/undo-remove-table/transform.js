const expect = require('expect');

module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .removeTable()
        .undo()
        .value;

    return value;
};
