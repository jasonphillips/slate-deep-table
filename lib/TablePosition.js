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
        const { table } = this;
        const rows = table.nodes;
        const cells = rows.get(0).nodes;

        return cells.size;
    }

    /**
     * Get count of rows
     * @return {Number}
     */
    getHeight() {
        const { table } = this;
        const rows = table.nodes;

        return rows.size;
    }

    /**
     * Get index of current row in the table.
     * @return {Number}
     */
    getRowIndex() {
        const { table, row } = this;
        const rows = table.nodes;

        return rows.findIndex(x => x === row);
    }

    /**
     * Get index of current column in the row.
     * @return {Number}
     */
    getColumnIndex() {
        const { row, cell } = this;
        const cells = row.nodes;

        return cells.findIndex(x => x === cell);
    }

    /**
     * @return {Boolean} True if on first cell of the table
     */
    isFirstCell() {
        return this.isFirstRow() && this.isFirstColumn();
    }

    /**
     * @return {Boolean} True if on last cell of the table
     */
    isLastCell() {
        return this.isLastRow() && this.isLastColumn();
    }

    /**
     * @return {Boolean} True if on first row
     */
    isFirstRow() {
        return this.getRowIndex() === 0;
    }

    /**
     * @return {Boolean} True if on last row
     */
    isLastRow() {
        return this.getRowIndex() === this.getHeight() - 1;
    }

    /**
     * @return {Boolean} True if on first column
     */
    isFirstColumn() {
        return this.getColumnIndex() === 0;
    }

    /**
     * @return {Boolean} True if on last column
     */
    isLastColumn() {
        return this.getColumnIndex() === this.getWidth() - 1;
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
            table,
            row,
            cell
        });
    }
}

module.exports = TablePosition;
