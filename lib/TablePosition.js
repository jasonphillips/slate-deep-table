const Immutable = require('immutable');

const DEFAULTS = {
    // Block containr for the table
    table: null,

    // Block for current row
    row: null,

    // Block for current cell
    cell: null
};

class TablePosition extends new Immutable.Record(DEFAULTS) {

    /**
     * Get count of columns
     * @return {Number}
     */
    getWidth() {
        let { table } = this;
        let rows = table.nodes;
        let cells = rows.get(0).nodes;

        return cells.size;
    }

    /**
     * Get count of rows
     * @return {Number}
     */
    getHeight() {
        let { table } = this;
        let rows = table.nodes;

        return rows.size;
    }

    /**
     * Get index of current row in the table.
     * @return {Number}
     */
    getRowIndex() {
        let { table, row } = this;
        let rows = table.nodes;

        return rows.findIndex(x => x === row);
    }

    /**
     * Get index of current cell in the row.
     * @return {Number}
     */
    getCellIndex() {
        let { row, cell } = this;
        let cells = row.nodes;

        return cells.findIndex(x => x === cell);
    }

    /**
     * Create a new instance of a TablePosition from a Slate state
     * and a current cell.
     *
     * @param  {Slate.State} state
     * @param  {State.Block} cell
     * @return {TablePosition}
     */
    static create(state, cell) {
        const row   = state.document.getParent(cell.key);
        const table = state.document.getParent(row.key);

        return new TablePosition({
            table: table,
            row:   row,
            cell:  cell
        });
    }
}

module.exports = TablePosition;
