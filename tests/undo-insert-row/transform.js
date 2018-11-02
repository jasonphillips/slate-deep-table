const expect = require('expect');

module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    let value = editor
        .moveToRangeOfNode(cursorBlock)
        .command(plugin.changes.insertRow)
        .undo()
        .value;

    value = editor.undo().value;

    // Back to previous cursor position

    // TODO: fix it
    // expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
