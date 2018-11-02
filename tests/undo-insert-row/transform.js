const expect = require('expect');

module.exports = function(editor) {
    const value = editor
        .insertRow()
        .undo()
        .value

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual('Col 1, Row 1');

    return value;
};
