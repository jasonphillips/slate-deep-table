const insertTable     = require('./changes/insertTable');
const insertRow       = require('./changes/insertRow');
const removeRow       = require('./changes/removeRow');
const insertColumn    = require('./changes/insertColumn');
const removeColumn    = require('./changes/removeColumn');
const removeTable     = require('./changes/removeTable');
const moveTableSelection   = require('./changes/moveSelection');
const moveTableSelectionBy = require('./changes/moveSelectionBy');
const toggleTableHeaders   = require('./changes/toggleHeaders');

const TablePosition = require('./TablePosition');
const onTab       = require('./onTab');
const onUpDown    = require('./onUpDown');
const makeSchema  = require('./makeSchema');
const makeRenderers = require('./defaultRenderers');

const KEY_TAB       = 'Tab';
const KEY_DOWN      = 'ArrowUp';
const KEY_UP        = 'ArrowDown';

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
    function isSelectionInTable(editor) {
        const { startBlock } = editor.value;
        if (!startBlock) return false;

        return TablePosition.isInCell(editor.value, startBlock, opts);
    }

    /**
     * Bind an editor command to our instance options as first arg
     */
    function bindEditor(fn) {
        return function(editor, ...args) {
            if (!isSelectionInTable(editor)) {
                return editor;
            }

            return fn(...[opts, editor].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, editor, next) {
        // Only handle events in cells
        if (!isSelectionInTable(editor)) {
            return next();
        }

        // Build arguments list
        const args = [ event, editor, opts ];

        switch (event.key) {
            case KEY_TAB:
                return onTab(...args);
            case KEY_DOWN:
            case KEY_UP:
                return onUpDown(...args);
        }
        return next();
    }

    const { schema, normalizeNode } = makeSchema(opts);
    const renderNode = makeRenderers(opts);

    return {
        onKeyDown,

        schema,
        normalizeNode,
        renderNode,

        queries: {
            isSelectionInTable,
        },

        commands: {
            insertTable:     insertTable.bind(null, opts),
            insertRow:       bindEditor(insertRow),
            removeRow:       bindEditor(removeRow),
            insertColumn:    bindEditor(insertColumn),
            removeColumn:    bindEditor(removeColumn),
            removeTable:     bindEditor(removeTable),
            moveTableSelection:   bindEditor(moveTableSelection),
            moveTableSelectionBy: bindEditor(moveTableSelectionBy),
            toggleTableHeaders:   bindEditor(toggleTableHeaders),
        }
    };
}

module.exports = EditTable;
