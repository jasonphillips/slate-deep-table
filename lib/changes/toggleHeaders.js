const TablePosition = require('../TablePosition');

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function toggleHeaders(opts, change) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
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