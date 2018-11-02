const expect = require('expect');

module.exports = function(editor) {
    const nonTableBlock = editor.value.document.getDescendant('_cursor_outside_table_');
    const tableBlock = editor.value.document.getDescendant('_cursor_inside_table_');

    // move to paragraph outside table, run query
    const queryNonTableBlock = editor
        .moveToRangeOfNode(nonTableBlock)
        .isSelectionInTable();

    expect(queryNonTableBlock).toBeFalsy();

    // move to paragraph within table, run query
    const queryTableBlock = editor
        .moveToRangeOfNode(tableBlock)
        .isSelectionInTable();

    expect(queryTableBlock).toBeTruthy();

    return editor.value;
};
