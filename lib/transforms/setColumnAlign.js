const TablePosition = require('../TablePosition');
const { Map } = require('immutable');

/**
 * Sets column alignment for a given column
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {String} align
 * @return {Slate.Transform}
 */
function setColumnAlign(opts, transform, at, align = 'center') {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    // Figure out column position, defaults 0 position to 1, any other falsy
    // values defaults to current column index
    if (at === 0) {
        at = 1;
    } else if (!at) {
        at = pos.getColumnIndex() + 1;
    }

    // and index, which is 0 based
    const index = at - 1;

    table.nodes.forEach((row) => {
        row.nodes.forEach((cell, i) => {
            if (i === index) {
                transform.setNodeByKey(cell.key, {
                    data: Map({
                        align
                    })
                });
            }
        });
    });

    return transform;
}

module.exports = setColumnAlign;
