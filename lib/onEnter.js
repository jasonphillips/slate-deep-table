const createRow = require('./createRow');

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, data, state, opts, pos) {
    let { table } = pos;
    let newRow = createRow(state, table, opts);

    let newTable = table.merge({
        nodes: table.nodes
            .insert(pos.getRowIndex() + 1, newRow)
    });

    return state
        .transform()

        // Replace the table
        .setNodeByKey(table.key, newTable)

        // Move selection to new row
        .collapseToEndOf(
            newRow.nodes.get(pos.getCellIndex())
        )
        .apply();
}

module.exports = onEnter;
