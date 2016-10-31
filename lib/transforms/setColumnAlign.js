const TablePosition = require('../TablePosition');
const { List } = require('immutable');

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

    let dataAlign = table.data.get('align');
    dataAlign = List(dataAlign);
    dataAlign = dataAlign.set(at, align);

    transform.setNodeByKey(table.key, {
        data: {
            align: dataAlign
        }
    });

    return transform;
}

module.exports = setColumnAlign;
