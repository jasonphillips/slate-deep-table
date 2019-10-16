module.exports = function(editor) {
    // path of cursor
    const path = editor.value.document.getPath('_cursor_');

    // pass it to the insertTable() method
    return editor.insertTableByPath(path).value
};
