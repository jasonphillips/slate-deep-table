const Slate = require('slate');
const { Text } = Slate;

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(opts, text) {
    text = text || '';
    const { typeCell, typeContent } = opts;

    return Slate.Block.create({
        type: typeCell,
        nodes: [
            Slate.Block.create({
                type:  typeContent,
                nodes: [
                    Text.fromJSON({
                        object: 'text',
                        text,
                    })
                ]
            })
        ]
    });
}

module.exports = createCell;
