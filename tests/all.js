const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const { Editor } = require('slate');
const DeepTable = require('../lib');
const makeSchema = require('../lib/makeSchema');
const Html = require('slate-html-serializer').default;
const jsdom = require('jsdom');

// a basic table for serialize test, with no headers
const basicTable = require('./basicTableInput').default;
// with headers 
const headerTable = require('./headerTableInput').default;

// a vanilla slate instance to normalize with
const normalizeDefault = value => (new Slate.Editor({ value })).value

// use the default serializers
const html = new Html({
    parseHtml: jsdom.JSDOM.fragment,
    rules: DeepTable.makeSerializerRules({}),
})

describe('slate-deep-table', function() {
    const tests = fs.readdirSync(__dirname);
    const plugin = DeepTable();

    tests.forEach(function(test) {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, function() {
            const dir = path.resolve(__dirname, test);
            const input = require(path.resolve(dir, 'input.js')).default;
            const expected = require(path.resolve(dir, 'expected.js')).default;
            const runTransform = require(path.resolve(dir, 'transform.js'));

            // create editor instance to normalize input
            const editor = new Slate.Editor({ value: input, plugins: [plugin] })

            // normalize expected as well, but with bare slate Editor
            const normalizedExpected = normalizeDefault(expected)

            const actual = runTransform(editor);
            //console.error(serialize(actual))

            expect(actual.toJSON()).toEqual(normalizedExpected.toJSON());
        });
    });

    it('can serialize with tbody, thead', function () {
        const serialized = html.serialize(headerTable);
        expect(serialized).toEqual(
           `<table>
                <thead>
                    <tr>
                        <td>
                            <p>Col 0, Row 0</p>
                        </td>
                        <td>
                            <p>Col 1, Row 0</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>Col 0, Row 1</p>
                        </td>
                        <td>
                            <p>Col 1, Row 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Col 0, Row 2</p>
                        </td>
                        <td>
                            <p>Col 1, Row 2</p>
                        </td>
                    </tr>
                </tbody>
            </table>`
        .split('\n').map(line => line.trim()).join(''))
    })

    it('can serialize headerless with only tbody', function () {
        const serialized = html.serialize(basicTable);
        expect(serialized).toEqual(
           `<table> 
                <tbody>
                    <tr>
                        <td>
                            <p>Col 0, Row 0</p>
                        </td>
                        <td>
                            <p>Col 1, Row 0</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Col 0, Row 1</p>
                        </td>
                        <td>
                            <p>Col 1, Row 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Col 0, Row 2</p>
                        </td>
                        <td>
                            <p>Col 1, Row 2</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>An extraneous paragraph</p>
        `
        .split('\n').map(line => line.trim()).join(''))
    })

    it('can deserialize an html table', function () {
        const htmlTable = `
            <table>
                <tr>
                    <td>
                        <p>Col 0, Row 0</p>
                    </td>
                    <td>
                        <p>Col 1, Row 0</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Col 0, Row 1</p>
                    </td>
                    <td>
                        <p>Col 1, Row 1</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Col 0, Row 2</p>
                    </td>
                    <td>
                        <p>Col 1, Row 2</p>
                    </td>
                </tr>
            </table>
            <p>An extraneous paragraph</p>
        `.split('\n').map(line => line.trim()).join('');

        const deserialized = html.deserialize(htmlTable);
        const value = new Slate.Editor({ value: deserialized, plugins: [plugin] }).value
    
        expect(value.toJSON()).toEqual(basicTable.toJSON());
    })

    it('can deserialize an html table with headers', function () {
        const htmlTable = `
            <table>
                <thead>
                    <tr>
                        <td>
                            <p>Col 0, Row 0</p>
                        </td>
                        <td>
                            <p>Col 1, Row 0</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>Col 0, Row 1</p>
                        </td>
                        <td>
                            <p>Col 1, Row 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Col 0, Row 2</p>
                        </td>
                        <td>
                            <p>Col 1, Row 2</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        `.split('\n').map(line => line.trim()).join('');

        const deserialized = html.deserialize(htmlTable);
        const value = new Slate.Editor({ value: deserialized, plugins: [plugin] }).value
    
        expect(value.toJSON()).toEqual(headerTable.toJSON());
    })

    it('handlers.getPosition() allows table position to be found', function () {
        const editor = new Slate.Editor({ value: basicTable, plugins: [plugin] })
        
        // move to row 2, cell 1
        const cursorBlock = editor.value.document.getDescendant('_cursor_');
        editor.moveToRangeOfNode(cursorBlock);

        // check current position
        const tablePosition = editor.getTablePosition();
        expect(tablePosition).toBeTruthy();
        expect(tablePosition.getRowIndex()).toEqual(1);
        expect(tablePosition.getColumnIndex()).toEqual(0);
        expect(tablePosition.getWidth()).toEqual(2);
        expect(tablePosition.getHeight()).toEqual(3);

        // move outside table, expect null result
        const cursorBlockTwo = editor.value.document.getDescendant('_cursor_2_');
        editor.moveToRangeOfNode(cursorBlockTwo);

        const tablePositionTwo = editor.getTablePosition();
        expect(tablePositionTwo).toEqual(null);
    })
});
