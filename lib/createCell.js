const Slate = require('slate');

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(type, text) {
    text = text || '';

    return Slate.Block.create({
        type: type
    });
}

module.exports = createCell;
