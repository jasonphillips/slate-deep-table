# slate-deep-table

[![NPM version](https://badge.fury.io/js/slate-deep-table.svg)](http://badge.fury.io/js/slate-deep-table)
[![Linux Build Status](https://travis-ci.org/jasonphillips/slate-deep-table.png?branch=master)](https://travis-ci.org/jasonphillips/slate-deep-table)

A Slate plugin to handle tables with nested block content. Forked from the excellent [slate-edit-table](https://github.com/GitbookIO/slate-edit-table) implementation, but retooled to work with deep content.

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
  EditTable()
]
```

If you wish to easily include default rendering functions, call `utils.getDefaultRenderers()` and merge the results into the schema object you will pass to your editor instance.

```js
const schema = {
    nodes: {
        // your types here
        paragraph:  props => <p {...props.attributes}>{props.children}</p>,
        heading:    props => <h1 {...props.attributes}>{props.children}</h1>,
        subheading: props => <h2 {...props.attributes}>{props.children}</h2>,
    }
};

// add default renderers for the types used by this plugin
Object.assign(schema.nodes, tablePlugin.utils.getDefaultRenderers());
```

#### Arguments

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.
- ``[typeContent: String]`` — type for the default blocks within cells.

### Utilities and Transform

`slate-deep-table` exports utilities and transforms:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: State) => Boolean`

Return true if selection is inside a table.

#### `utils.isSelectionInTable`

`plugin.utils.getDefaultRenderers() => Object`

Returns default rendering functions to easily incorporate into your schema; see example.

#### `transforms.insertTable`

`plugin.transforms.insertTable(transform: Transform, columns: Number?, rows: Number?) => Transform`

Insert a new empty table.

#### `transforms.insertRow`

`plugin.transforms.insertRow(transform: Transform, at: Number?) => Transform`

Insert a new row after the current one or at the specific index (`at`).

#### `transforms.insertColumn`

`plugin.transforms.insertColumn(transform: Transform, at: Number?) => Transform`

Insert a new column after the current one or at the specific index (`at`).

#### `transforms.removeTable`

`plugin.transforms.removeTable(transform: Transform) => Transform`

Remove current table.

#### `transforms.removeRow`

`plugin.transforms.removeRow(transform: Transform, at: Number?) => Transform`

Remove current row or the one at a specific index (`at`).

#### `transforms.removeColumn`

`plugin.transforms.removeColumn(transform: Transform, at: Number?) => Transform`

Remove current column or the one at a specific index (`at`).

#### `transforms.moveSelection`

`plugin.transforms.moveSelection(transform: Transform, column: Number, row: Number) => Transform`

Move the selection to a specific position in the table.

#### `transforms.moveSelectionBy`

`plugin.transforms.moveSelectionBy(transform: Transform, column: Number, row: Number) => Transform`

Move the selection by the given amount of columns and rows.

#### `transforms.toggleHeaders`

`plugin.transforms.toggleHeaders(transform: Transform) => Transform`

Toggles whether the table will render the first row as a header row (within a thead) or as a regular row.


