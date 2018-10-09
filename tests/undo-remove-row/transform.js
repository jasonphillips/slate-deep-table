module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');

    const initial = value.change({ save: false })
        .moveToRangeOfNode(cursorBlock)
        .value;

    value = initial.change()
        .call(plugin.changes.removeRow)
        .value;

    return value.change().undo().value;
};
