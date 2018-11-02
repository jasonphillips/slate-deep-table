const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const { Editor } = require('slate');
const DeepTable = require('../lib');
const makeSchema = require('../lib/makeSchema');

// a basic table for serialize test
const basicTable = require('./basicTableInput').default;
const serialize = require('./serialize');


const normalizeDefault = value => (new Slate.Editor({ value })).value

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
        const serialized = serialize(basicTable);
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
});
