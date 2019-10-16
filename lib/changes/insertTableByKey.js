const createTable = require('../createTable');

/**
 * Insert a new table by key, if index is left empty it defaults to 0
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {String} key
 * @param {Number} index
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Editor}
 */
function insertTableByKey(opts, editor, key, index = 0, columns = 2, rows = 2) {
  // Create the table node
  const fillWithEmptyText = (x, y) => '';
  const table = createTable(opts, columns, rows, fillWithEmptyText);

  const done = editor.insertNodeByKey(key, index, table);
  return done;
}

module.exports = insertTableByKey;
