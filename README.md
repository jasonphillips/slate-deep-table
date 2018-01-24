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

### Simple Usage

```js
import EditTable from 'slate-deep-table'

const plugins = [
  EditTable({ /* options here */ })
]

// then use as plugins prop on your slate Editor
```

#### Options

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.
- ``[typeContent: String]`` — type for the default blocks within cells.

### Utilities and Change

`slate-deep-table` exports utilities and changes:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: State) => Boolean`

Return true if selection is inside a table.

#### `changes.insertTable`

`plugin.changes.insertTable(change: Change, columns: Number?, rows: Number?) => Change`

Insert a new empty table.

#### `changes.insertRow`

`plugin.changes.insertRow(change: Change, at: Number?) => Change`

Insert a new row after the current one or at the specific index (`at`).

#### `changes.insertColumn`

`plugin.changes.insertColumn(change: Change, at: Number?) => Change`

Insert a new column after the current one or at the specific index (`at`).

#### `changes.removeTable`

`plugin.changes.removeTable(change: Change) => Change`

Remove current table.

#### `changes.removeRow`

`plugin.changes.removeRow(change: Change, at: Number?) => Change`

Remove current row or the one at a specific index (`at`).

#### `changes.removeColumn`

`plugin.changes.removeColumn(change: Change, at: Number?) => Change`

Remove current column or the one at a specific index (`at`).

#### `changes.moveSelection`

`plugin.changes.moveSelection(change: Change, column: Number, row: Number) => Change`

Move the selection to a specific position in the table.

#### `changes.moveSelectionBy`

`plugin.changes.moveSelectionBy(change: Change, column: Number, row: Number) => Change`

Move the selection by the given amount of columns and rows.

#### `changes.toggleHeaders`

`plugin.changes.toggleHeaders(change: Change) => Change`

Toggles whether the table will render the first row as a header row (within a thead) or as a regular row.


