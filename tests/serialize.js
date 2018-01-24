import Html from 'slate-html-serializer';
import React from 'react';

const toHtml = new Html({
    rules: [
        {
            serialize(obj, children) {
                if (obj.object == 'block') {
                    switch (obj.type) {
                        case 'table': 
                            return obj.data.get('headless')
                                ? <table data={{headless: true}}>{children}</table>
                                : <table>{children}</table>;
                        case 'table_row': return <tr>{children}</tr>;
                        case 'table_cell': return <td>{children}</td>;
                        case 'paragraph': return <p>{children}</p>;
                        case 'heading': return <h2>{children}</h2>;
                        case 'subheading': return <h3>{children}</h3>;
                        default: return;
                    }
                }
                if (obj.object == 'inline' && obj.type == 'link') {
                    return <a>{children}</a>;
                }
            },
        }
    ],
});

module.exports = toHtml.serialize;