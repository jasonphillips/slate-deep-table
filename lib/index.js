const insertTable     = require('./transforms/insertTable');
const insertRow       = require('./transforms/insertRow');
const removeRow       = require('./transforms/removeRow');
const insertColumn    = require('./transforms/insertColumn');
const removeColumn    = require('./transforms/removeColumn');
const removeTable     = require('./transforms/removeTable');
const moveSelection   = require('./transforms/moveSelection');
const moveSelectionBy = require('./transforms/moveSelectionBy');
const toggleHeaders   = require('./transforms/toggleHeaders');
const defaultRenderers = require('./defaultRenderers');

const TablePosition = require('./TablePosition');
const onTab       = require('./onTab');
const onUpDown    = require('./onUpDown');
const makeSchema  = require('./makeSchema');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';
const KEY_DOWN      = 'down';
const KEY_UP        = 'up';

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @param {String} opts.typeContent The type of default content blocks
 */
function EditTable(opts) {
    opts = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow = opts.typeRow || 'table_row';
    opts.typeCell = opts.typeCell || 'table_cell';
    opts.typeContent = opts.typeContent || 'paragraph';

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        const { startBlock } = state;
        if (!startBlock) return false;

        return TablePosition.isInCell(state, startBlock, opts);
    }

    /**
     * Bind a change
     */
    function bindTransform(fn) {
        return function(change, ...args) {
            const { state } = change;

            if (!isSelectionInTable(state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, change) {
        const { state } = change;
        // Only handle events in cells
        if (!isSelectionInTable(state)) {
            return;
        }

        // Build arguments list
        const args = [
            e, data, change,
            opts
        ];

        switch (data.key) {
        case KEY_TAB:
            return onTab(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        }
    }

    const schema = makeSchema(opts);

    return {
        onKeyDown,

        schema,

        utils: {
            isSelectionInTable,
            getDefaultRenderers: () => defaultRenderers(opts),
        },

        transforms: {
            insertTable:     insertTable.bind(null, opts),
            insertRow:       bindTransform(insertRow),
            removeRow:       bindTransform(removeRow),
            insertColumn:    bindTransform(insertColumn),
            removeColumn:    bindTransform(removeColumn),
            removeTable:     bindTransform(removeTable),
            moveSelection:   bindTransform(moveSelection),
            moveSelectionBy: bindTransform(moveSelectionBy),
            toggleHeaders:   bindTransform(toggleHeaders),
        }
    };
}

module.exports = EditTable;
