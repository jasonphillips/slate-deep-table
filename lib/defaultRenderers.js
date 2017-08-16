import React from 'react';

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
const splitHeader = (props) => {
    const rows = props.children;
    const header = !(props.node.get('data').get('headless'));

    if (!header || !rows || !rows.length || rows.length===1) {
        return {header: null, rows: rows};
    }
    return {
        header: rows[0],
        rows: rows.slice(1),
    };
}

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
const makeRenderers = (opts = {}) => ({
    [opts.typeTable || 'table']: props => {
        const {header, rows} = splitHeader(props);

        return (
            <table>
                {header && 
                    <thead {...props.attributes}>
                        {header}
                    </thead>
                }
                <tbody {...props.attributes}>
                    {rows}
                </tbody>
            </table>
        );
    },
    [opts.typeRow || 'table_row']:  props => <tr {...props.attributes}>{props.children}</tr>,
    [opts.typeCell || 'table_cell']: props => <td {...props.attributes}>{props.children}</td>,
});

module.exports = makeRenderers;