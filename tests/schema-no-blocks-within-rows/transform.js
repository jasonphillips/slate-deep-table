const Slate = require('slate');

module.exports = function(plugin, editor) {
    return editor
        .normalize()
        .value;
};
