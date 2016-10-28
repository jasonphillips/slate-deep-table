
const PluginEditTable = require('..');
const expect = require('expect');

describe('slate-edit-list', () => {
    it('exposes align constants', () => {
        expect(PluginEditTable.ALIGN).toEqual({
            LEFT: 'left',
            RIGHT: 'right',
            CENTER: 'center'
        });
    });
});
