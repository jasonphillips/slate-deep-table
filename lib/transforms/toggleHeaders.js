const TablePosition = require('../TablePosition');

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function toggleHeaders(opts, change) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;

    const currentSetting = !!table.get('data').get('headless');

    change.setNodeByKey(table.key, {
        data: {
            headless: !currentSetting
        }
    });

    return change;
}

module.exports = toggleHeaders;