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
        .setNodeByKey(table.key, newTable)
        // TODO: move selection to new cell
        .apply();
}

module.exports = onEnter;
