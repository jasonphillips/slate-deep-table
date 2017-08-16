const Slate = require('slate');

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
                    Slate.Raw.deserializeText({
                        kind: 'text',
                        text
                    }, { terse: true })
                ]
            })
        ]
    });
}

module.exports = createCell;
