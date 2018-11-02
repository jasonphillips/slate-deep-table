const expect = require('expect');

module.exports = function(editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');
    const offset = 2;

    editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(offset)
        .moveTableSelectionBy(-1, -1);

    const { selection, startBlock } = editor.value;

    expect(startBlock.text).toEqual('Col 0, Row 0');
    expect(selection.start.key).toEqual(selection.end.key);
    // Keep same offset
    expect(selection.start.offset).toEqual(offset);

    return editor.value;
};
