const expect = require('expect');

module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');
    const offset = 2;
    const value = editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(offset)
        .command(plugin.changes.moveSelection, 2, 2)
        .value;

    expect(editor.value.startBlock.text).toEqual('Col 2, Row 2');
    const selection = editor.value.selection;
    expect(selection.start.key).toEqual(selection.end.key);
    // Keep same offset
    expect(selection.start.offset).toEqual(offset);

    return value;
};
