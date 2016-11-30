const Slate = require('slate');

module.exports = function(plugin, state) {
    const schema = new Slate.Schema(plugin.schema);
    return state.transform()
        .normalize(schema)
        .apply();
};
