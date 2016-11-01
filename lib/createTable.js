const { Range } = require('immutable');
const Slate = require('slate');
const createRow = require('./createRow');
const createAlign = require('./createAlign');

/**
 * Create a table
 *
 * @param {Slate.State} state
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createTable(opts, columns, rows, textGetter) {
    const rowNodes = Range(0, rows)
        .map(i => createRow(opts, columns, textGetter ? textGetter.bind(null, i) : null))
        .toList();
    const align = createAlign(columns);

    return Slate.Block.create({
        type:  opts.typeTable,
        nodes: rowNodes,
        data: {
            align
        }
    });
}

module.exports = createTable;
