# slate-deep-table

[![npm version](https://badge.fury.io/js/slate-deep-table.svg)](https://badge.fury.io/js/slate-deep-table)
[![Linux Build Status](https://travis-ci.org/jasonphillips/slate-deep-table.png?branch=master)](https://travis-ci.org/jasonphillips/slate-deep-table)

A Slate plugin to handle tables with nested block content. Forked from the excellent [slate-edit-table](https://github.com/GitbookIO/slate-edit-table) implementation, but retooled to work with deep content.

Demo: https://jasonphillips.github.io/slate-deep-table/

### Install

```
npm install slate-deep-table
```

### Features

- Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, move the cursor to next/previous row
- Pressing <kbd>Tab</kbd>, move the select to next cell
- Pressing <kbd>Shift+Tab</kbd>, move the select to previous cell
- Permits nested block content within table cells
- Optionally create headerless tables

### Compatibility

Slate is a fast-moving library, so check the CHANGELOG for information on the currently supported version.

### Simple Usage

```js
import DeepTable from 'slate-deep-table'

const plugins = [
  DeepTable({ /* options object here; see below */ })
]

// now instantiate your Slate Editor with these plugins, according to slate documentation
```

#### Options

- `[typeTable: String]` — type for table `default: 'table'`
- `[typeRow: String]` — type for the rows `default: 'table_row'`
- `[typeCell: String]` — type for the cells `default: 'table_cell'`
- `[typeContent: String]` — type for the default blocks within cells `default: 'paragraph'`

### Queries and Commands

`slate-deep-table` exports queries and commands that you can invoke on your `editor` instance:

```js
// anywhere where 'editor' is passed as an argument, or using the react Component's ref, 
// you may directly invoke any of the exported functions below, e.g:
const inATable = editor.isSelectionInTable();

if (!inATable) {
  editor.insertTable();
}
```

Check `example/main.js` for usage in a typical context. 

#### `query isSelectionInTable()`

`editor.isSelectionInTable() => Boolean`

Return true if current cursor position is inside a table.

#### `query getTablePosition()`

`editor.getTablePosition() => null || TablePosition`

Returns null if cursor is not in a table, else returns an object you can use to query the current cell and row location:

```js
const position = editor.getTablePosition()

position.getRowIndex() // returns row id (0-indexed)
position.getColumnIndex() // return column index (0-indexed)
position.getWidth() // returns count of columns
position.getHeight() // returns count of rows
```

#### `command insertTable()`

`editor.insertTable(columns: Number?, rows: Number?) => Editor`

Insert a new empty table.

#### `command insertTableByKey/Path()`

`editor.insertTableByKey(key: String, index: Number?, columns: Number?, rows: Number?) => Editor`

`editor.insertTableByPath(path: List, index: Number?, columns: Number?, rows: Number?) => Editor`

Insert a new empty table by Key/Path, follows `insertNodeByKey/Path()`'s insertion procedure. Index defaults to 0 if empty.

#### `command insertRow()`

`editor.insertRow(at: Number?) => Editor`

Insert a new row after the current one or at the specific index (`at`).

#### `command insertColumn()`

`editor.insertColumn(at: Number?) => Editor`

Insert a new column after the current one or at the specific index (`at`).

#### `command removeTable()`

`editor.removeTable() => Editor`

Remove current table.

#### `command removeRow()`

`editor.removeRow(at: Number?) => Editor`

Remove current row or the one at a specific index (`at`).

#### `command removeColumn()`

`editor.removeColumn(at: Number?) => Editor`

Remove current column or the one at a specific index (`at`).

#### `command moveTableSelection()`

`editor.moveTableSelection(column: Number, row: Number) => Editor`

Move the selection to a specific position in the table.

#### `command moveTableSelectionBy()`

`editor.moveTableSelectionBy(column: Number, row: Number) => Editor`

Move the selection by the given amount of columns and rows.

#### `command toggleTableHeaders()`

`editor.toggleTableHeaders() => Editor`

Toggles whether the table will render the first row as a header row (within a thead) or as a regular row.


