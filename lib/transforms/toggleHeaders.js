const TablePosition = require('../TablePosition');

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function toggleHeaders(opts, transform) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock, opts);
    const { table } = pos;
    
    const currentSetting = !!table.get('data').get('headless');

    transform.setNodeByKey(table.key, {
        data: {
            headless: !currentSetting
        }
    });

    return transform;
}

module.exports = toggleHeaders;