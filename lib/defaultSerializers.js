const React = require('react');

// default rules to pass to slate's html serializer (see tests)
const makeSerializerRules = (opts = {}) => {
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow = opts.typeRow || 'table_row';
    opts.typeCell = opts.typeCell || 'table_cell';
    opts.typeContent = opts.typeContent || 'paragraph';

    const TABLE_CHILD_TAGS = {
        tr: opts.typeRow,
        th: opts.typeCell,
        td: opts.typeCell,
    }

    return [
        {
        serialize(obj, children) {
            if (obj.object == 'block') {
            switch (obj.type) {
                case opts.typeTable: 
                    const headers = !obj.data.get('headless');
                    const rows = children;
                    const split = (!headers || !rows || !rows.size || rows.size===1)
                        ?  { header: null, rows: rows }
                        : {
                        header: rows.get(0),
                        rows: rows.slice(1),
                        }

                    return (
                        <table>
                        {headers && 
                            <thead>{split.header}</thead>
                        }
                        <tbody>{split.rows}</tbody>
                        </table>
                    );
                case opts.typeRow: return <tr>{children}</tr>;
                case opts.typeCell: return <td>{children}</td>;
                case opts.typeContent: return <p>{children}</p>;
                default: return;
            }
            }
            if (obj.object == 'inline' && obj.type == 'link') {
            return <a>{children}</a>;
            }
        },
        deserialize(el, next) {
            const tag = el.tagName.toLowerCase();
            
            if (tag==='table') {
                const data = { headless: true }

                if (
                    el.firstElementChild && 
                    el.firstElementChild.tagName.toLowerCase()==='thead'
                ) {
                    data.headless = false
                }

                return {
                    object: "block",
                    type: opts.typeTable,
                    data: data,
                    nodes: next(el.childNodes),
                }
            }

            const type = TABLE_CHILD_TAGS[tag];

            if (type) {
                return {
                    object: "block",
                    type: type,
                    data: {},
                    nodes: next(el.childNodes),
                }
            }
        }
        }
    ];
}

module.exports = makeSerializerRules;