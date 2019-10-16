const createTable = require('../createTable');

/**
 * Insert a new table by path, if index is left empty it defaults to 0
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {List} path
 * @param {Number} index
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Editor}
 */
function insertTableByPath(opts, editor, path, index = 0, columns = 2, rows = 2) {
  // Create the table node
  const fillWithEmptyText = (x, y) => '';
  const table = createTable(opts, columns, rows, fillWithEmptyText);

  const done = editor.insertNodeByPath(path, index, table);
  return done;
}

module.exports = insertTableByPath;
