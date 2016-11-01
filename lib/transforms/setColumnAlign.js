const TablePosition = require('../TablePosition');
const { List } = require('immutable');
const ALIGN = require('../ALIGN');
const createAlign = require('../createAlign');

/**
 * Sets column alignment for a given column
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {String} align
 * @return {Slate.Transform}
 */
function setColumnAlign(opts, transform, align = ALIGN.DEFAULT, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const newAlign = createAlign(pos.getWidth(), table.data.get('align'));
    newAlign[at] = align;

    transform.setNodeByKey(table.key, {
        data: {
            align: newAlign
        }
    });

    return transform;
}

module.exports = setColumnAlign;
