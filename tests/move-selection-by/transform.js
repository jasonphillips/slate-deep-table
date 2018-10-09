const expect = require('expect');

module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');
    const offset = 2;

    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(offset)
        .command(plugin.changes.moveSelectionBy, -1, -1)
        .value;

    expect(editor.value.startBlock.text).toEqual('Col 0, Row 0');
    const selection = editor.value.selection;
    expect(selection.start.key).toEqual(selection.end.key);
    // Keep same offset
    expect(selection.start.offset).toEqual(offset);


    return value;
};
