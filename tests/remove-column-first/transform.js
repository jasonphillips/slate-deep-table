module.exports = function(plugin, value) {
    const cursorBlock = value.document.getDescendant('_cursor_');

    return value.change()
        .moveToRangeOfNode(cursorBlock)
        .call(plugin.changes.removeColumn)
        .value;
};
