# slate-edit-table

[![NPM version](https://badge.fury.io/js/slate-edit-table.svg)](http://badge.fury.io/js/slate-edit-table)

A Slate plugin to handle table edition.

### Install

```
npm install slate-edit-table
```

### Features

- Pressing <kbd>Enter</kbd> insert a new row

### Simple Usage

```js
import EditTable from 'slate-edit-table'

const plugins = [
  EditTable()
]
```

#### Arguments

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.
