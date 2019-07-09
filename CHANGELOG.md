# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.9.5] - 2019-7-8

  - now exports a function to obtain default serializer rules; see comment https://github.com/jasonphillips/slate-deep-table/issues/18#issuecomment-509439219

## [0.9.1] - 2019-7-8

  - compatibility with Slate 0.46.x

## [0.8.0] - 2018-11-2

  - compatibility with slate 0.43.x (thanks @eugene-preply )

### Breaking
  - Slate now hoists exported commands and queries to functions callable directly on the Editor instance. So instead of invoking e.g. `plugin.utils.insertTable()` you will now call it directly on your editor, eg. `editor.insertTable()`. See the tests for more examples.
  - added `isSelectionInTable()` as an exported query
  - renamed some commands for more specificity to ensure they don't collide with other plugins:
    - `moveSelection()` -> `moveTableSelection()`
    - `moveSelectionBy()` -> `moveTableSelectionBy()`
    - `toggleHeaders()` -> `toggleTableHeaders()`

## [0.7.0] - 2018-10-7

  - compatibility with slate 0.41.x (thanks @marcjps)

## [0.6.0] - 2017-01-24

  - compatibility with slate 0.32.x
  - many updates to usage as a result; see the slate changelog, the updated README, and the example

## [0.5.1] - 2017-08-16
  
  - initial working fork of prior project
