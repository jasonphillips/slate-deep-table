const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');

    const initial = value.change({ save: false })
        .moveToRangeOfNode(cursorBlock)
        .value;

    value = initial.change()
        .call(plugin.changes.removeTable)
        .value;

    value = value.change().undo().value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
