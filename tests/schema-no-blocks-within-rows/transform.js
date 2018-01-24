const Slate = require('slate');

module.exports = function(plugin, value) {
    return value.change()
        .normalize()
        .value;
};
