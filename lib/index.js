const onEnter       = require('./onEnter');
const onTab         = require('./onTab');
const onBackspace   = require('./onBackspace');
const onUpDown      = require('./onUpDown');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';
const KEY_DOWN      = 'down';
const KEY_UP        = 'up';


function EditTable(opts) {
    opts           = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow   = opts.typeRow || 'table_row';
    opts.typeCell  = opts.typeCell || 'table_cell';

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        // Only handle events in cells
        if (startBlock.type !== opts.typeCell) {
            return;
        }

        // Build arguments list
        const args = [
            e, data, state,
            opts
        ];

        switch (data.key) {
        case KEY_ENTER:
            return onEnter.apply(null, args);
        case KEY_TAB:
            return onTab.apply(null, args);
        case KEY_BACKSPACE:
            return onBackspace.apply(null, args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown.apply(null, args);
        }
    }

    return {
        onKeyDown
    };
}

module.exports = EditTable;
