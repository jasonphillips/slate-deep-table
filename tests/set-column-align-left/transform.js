module.exports = function(plugin, state) {
    return plugin.transforms.setColumnAlign(state.transform(), 'left', 1).apply();
};
