const expect = require('expect');

module.exports = function(plugin, editor) {
    const cursorBlock = editor.value.document.getDescendant('_cursor_');

    return editor
        .command(plugin.changes.removeTable)
        .moveToRangeOfNode(cursorBlock)
        .undo()
        .value;
};
