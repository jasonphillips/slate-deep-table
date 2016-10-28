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
function setColumnAlign(opts, transform, align = 'center', at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    table.nodes.forEach((row) => {
        row.nodes.forEach((cell, i) => {
            if (i === at) {
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
