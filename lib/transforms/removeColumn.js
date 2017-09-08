const Slate = require('slate');
const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach((row) => {
            const cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key);
        });
    }
    // If last column, clear text in cells instead
    else {
        rows.forEach((row) => {
            row.nodes.forEach((cell) => {
                // remove existing children
                cell.nodes.forEach((node) => {
                    change.removeNodeByKey(node.key);
                });
                // add the empty child content node
                const emptyChild = Slate.Block.create({
                    type:  opts.typeContent,
                    nodes: [
                        Slate.Raw.deserializeText({
                            kind: 'text',
                            text: ''
                        }, { terse: true })
                    ]
                });
                change.insertNodeByKey(cell.key, 0, emptyChild);
            });
        });
    }

    // Replace the table
    return change;
}

module.exports = removeColumn;
