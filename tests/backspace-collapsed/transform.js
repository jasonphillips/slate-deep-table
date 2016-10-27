module.exports = function(plugin, state) {
    const blockStart = state.document.getDescendant('anchor');

    const withCursor = state.transform()
        .collapseToStartOf(blockStart)
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
