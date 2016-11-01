# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.8.1] - 2016-11-01
  [0.8.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.0...0.8.1

### Fixed
- Add schema to normalize `align` in table
- `insertColumn` and `removeColumn` update correctly the alignment

## [0.8.0] - 2016-10-27
  [0.8.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.7.0...0.8.0

### Added
- Expose `setColumnAlign` transform
- Expose `ALIGN.{LEFT,RIGHT,CENTER}` constants

### Fixed
- Rules to ensure cells or rows are always within a table. Fix
  [#13](https://github.com/GitbookIO/slate-edit-table/issues/13)

## [0.7.0] - 2016-10-27
  [0.7.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.6.0...0.7.0

- Adapt for upcoming Slate release
- Improve stability

## [0.6.0] - 2016-09-23
  [0.6.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.1...0.6.0

### Added
- Expose `moveSelectionBy` transform

### Changed
- `removeColumn` clears the column instead, if it is the last remaining column
- `removeRow` clears the row instead, if it is the last remaining row

### Fixed
- Undo of `insertColumn` when cursor is in inserted column


## [0.5.1] - 2016-09-15
  [0.5.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.0...0.5.1

### Changed
- `insertTable` does not grab text from current block anymore, and simply inserts an empty table.

### Fixed
- Up/Down arrows behavior inside tables


## [0.5.0] - 2016-09-15
  [0.5.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.4.0...0.5.0

### Added
- `TablePosition.is{First|Last}{Row|Column|Cell}` methods

### Changed
- **BREAKING** Now uses `slate^0.14.x`
- Split transform `moveSelection` into `moveSelection` and `moveSelectionBy`


## [0.4.0] - 2016-09-06
  [0.4.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.3.0...0.4.0

### Added
- Schema normalization rules
