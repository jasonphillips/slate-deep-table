const TablePosition = require('../TablePosition');

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @return {Slate.Editor}
 */
function toggleHeaders(opts, editor) {
    const { value } = editor;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock, opts);
    const { table } = pos;

    const currentSetting = !!table.get('data').get('headless');

    editor.setNodeByKey(table.key, {
        data: {
            headless: !currentSetting
        }
    });

    return editor;
}

module.exports = toggleHeaders;