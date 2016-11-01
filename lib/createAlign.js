const { Range } = require('immutable');
const ALIGN = require('./ALIGN');

/**
 * Create a set of alignment
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createAlign(columns, base = []) {
    return Range(0, columns)
        .map(i => base[i] || ALIGN.DEFAULT)
        .toArray();
}

module.exports = createAlign;
