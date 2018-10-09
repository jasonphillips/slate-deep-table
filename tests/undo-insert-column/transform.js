const expect = require('expect');

module.exports = function(plugin, editor) {

    let value = editor
        .command(plugin.changes.insertColumn)
        .value;

    value = editor.undo().value;

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
