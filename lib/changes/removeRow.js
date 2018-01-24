const Slate = require('slate');
const { Text } = Slate;
const TablePosition = require('../TablePosition');

/**
 * Remove current row in a table. Clear it if last remaining row
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeRow(opts, change, at) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    const row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(row.key);
    }
    // If last remaining row, clear it instead
    else {
        row.nodes.forEach((cell) => {
            // remove existing children
            cell.nodes.forEach((node) => {
                change.removeNodeByKey(node.key,  { normalize: false });
            });
            // add the empty child content node
            const emptyChild = Slate.Block.create({
                type:  opts.typeContent,
                nodes: [
                    Text.fromJSON({
                        object: 'text',
                        text: '',
                    })
                ]
            });
            change.insertNodeByKey(cell.key, 0, emptyChild,  { normalize: false });
        });
    }

    return change;
}

module.exports = removeRow;
