module.exports = function(plugin, state) {
    const blockStart = state.document.getDescendant('anchor');
    const blockEnd = state.document.getDescendant('focus');

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
