const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const { Value } = Slate;
const DeepTable = require('../lib');

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
            
            const withSchema = input.change()
                .setValue({ schema: Slate.Schema.create({ plugins: [plugin] }) })
                .value;

            const actual = runTransform(plugin, withSchema);

            expect(actual.toJSON()).toEqual(expected.toJSON());
        });
    });
});
