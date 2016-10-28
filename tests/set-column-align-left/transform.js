module.exports = function(plugin, state) {
    return plugin.transforms.setColumnAlign(state.transform(), 'left', 0).apply();
};
