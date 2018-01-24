const expect = require('expect');

module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');
    
    const initial = value.change({ save: false })
        .moveToRangeOf(cursorBlock)
        .move(6)
        .value;

    value = initial.change()
        .call(plugin.changes.insertTable)
        .value;

    value = value.change().undo().value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('BeforeAfter');

    return value;
};
