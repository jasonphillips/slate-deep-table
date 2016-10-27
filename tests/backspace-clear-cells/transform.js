module.exports = function(plugin, state) {
    const blocks = state.document.filterDescendants(node => node.type == 'table_cell');
    const blockStart = blocks.get(3);
    const blockEnd = blocks.get(6);

    const withCursor = state.transform()
        .collapseToStartOf(blockStart)
        .extendToEndOf(blockEnd)
        .apply();

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );
};
