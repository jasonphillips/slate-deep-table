const expect = require('expect');

module.exports = function(plugin, value) {

    value = value.change()
        .call(plugin.changes.insertColumn)
        .value;

    value = value.change().undo().value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
