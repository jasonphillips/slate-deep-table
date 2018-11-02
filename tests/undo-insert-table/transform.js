const expect = require('expect');

module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(6)
        .insertTable()
        .undo()
        .value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('BeforeAfter');

    return value;
};
