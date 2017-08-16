const Immutable = require('immutable');
const Slate = require('slate');
const createCell = require('./createCell');

/**
 * Create a new row block
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createRow(opts, columns, textGetter) {
    const cellNodes = Immutable.Range(0, columns)
        .map(i => createCell(opts, textGetter ? textGetter(i) : ''))
        .toList();

    return Slate.Block.create({
        type:  opts.typeRow,
        nodes: cellNodes
    });
}

module.exports = createRow;
