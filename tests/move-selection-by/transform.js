const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');
    const offset = 2;

    value = value.change()
        .moveToRangeOfNode(cursorBlock)
        .moveForward(offset)
        .call(plugin.changes.moveSelectionBy, -1, -1)
        .value;

    expect(value.startBlock.text).toEqual('Col 0, Row 0');
    const selection = value.selection;
    expect(selection.start.key).toEqual(selection.end.key);
    // Keep same offset
    expect(selection.start.offset).toEqual(offset);


    return value;
};
