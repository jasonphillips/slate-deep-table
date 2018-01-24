const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');
    const offset = 2;
    const change = value.change()
        .moveToRangeOf(cursorBlock)
        .move(offset)
        .call(plugin.changes.moveSelection, 2, 2)
        .value;

    expect(change.startBlock.text).toEqual('Col 2, Row 2');
    const selection = change.selection;
    expect(selection.startKey).toEqual(selection.endKey);
    // Keep same offset
    expect(selection.startOffset).toEqual(offset);

    return change;
};
