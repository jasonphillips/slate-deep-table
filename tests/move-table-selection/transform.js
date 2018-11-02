const expect = require('expect');

module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');
    const offset = 2;
    editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(offset)
        .moveTableSelection(2, 2);

    const { selection, startBlock } = editor.value;

    expect(startBlock.text).toEqual('Col 2, Row 2');
    expect(selection.start.key).toEqual(selection.end.key);
    // Keep same offset
    expect(selection.start.offset).toEqual(offset);

    return editor.value;
};
