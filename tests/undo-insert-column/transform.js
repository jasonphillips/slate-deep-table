const expect = require('expect');

module.exports = function(editor) {

    editor.insertColumn();

    editor.undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('Col 1, Row 1');

    return editor.value;
};
