const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');
    const offset = 2;

    value = value.change()
        .moveToRangeOf(cursorBlock)
        .move(offset)
        .call(plugin.changes.moveSelectionBy, -1, -1)
        .value;

    expect(value.startBlock.text).toEqual('Col 0, Row 0');
    const selection = value.selection;
    expect(selection.startKey).toEqual(selection.endKey);
    // Keep same offset
    expect(selection.startOffset).toEqual(offset);

    return value;
};
