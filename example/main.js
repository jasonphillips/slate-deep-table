const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const SlateReact = require('slate-react');
const { Editor } = SlateReact;
const PluginEditTable = require('../lib/');
const initialValue = require('./value.js');

const tablePlugin = PluginEditTable();
const plugins = [
    tablePlugin
];

const renderNode = (props, editor, next) => {
    switch (props.node.type) {
        case 'paragraph':  return <p {...props.attributes}>{props.children}</p>;
        case 'heading':    return <h1 {...props.attributes}>{props.children}</h1>;
        case 'subheading': return <h2 {...props.attributes}>{props.children}</h2>;
    }
    return next();
};


class Example extends React.Component {
    constructor (props) {
        super(props);
        this.state = { value: initialValue };
        this.editor = null;
    }

    onChange = ({ value }) => {
        this.setState({ value });
    }

    onInsertTable = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.insertTable)
        );
    }

    onInsertColumn = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.insertColumn)
        );
    }

    onInsertRow = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.insertRow)
        );
    }

    onRemoveColumn = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.removeColumn)
        );
    }

    onRemoveRow= () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.removeRow)
        );
    }

    onRemoveTable = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.removeTable)
        );
    }

    onToggleHeaders = () => {
        this.onChange(
            this.editor.command(tablePlugin.changes.toggleHeaders)
        );
    }

    renderNormalToolbar = () => {
        return (
            <div className="buttons">
                <button onClick={this.onInsertTable}>Insert Table</button>
            </div>
        );
    }

    renderTableToolbar = () => {
        return (
            <div className="buttons">
                <button onClick={this.onInsertTable}>Insert Table</button>
                <button onClick={this.onInsertColumn}>Insert Column</button>
                <button onClick={this.onInsertRow}>Insert Row</button>
                <button onClick={this.onRemoveColumn}>Remove Column</button>
                <button onClick={this.onRemoveRow}>Remove Row</button>
                <button onClick={this.onRemoveTable}>Remove Table</button>
                <button onClick={this.onToggleHeaders}>Toggle Headers</button>
            </div>
        );
    }

    render() {
        const { value } = this.state;
        if (!value) console.log('val!!!', this.state)
        const isTable = tablePlugin.utils.isSelectionInTable(value);

        return (
            <div>
                {isTable? this.renderTableToolbar() : this.renderNormalToolbar()}
                <Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={value}
                    ref={editor => this.editor = editor}
                    onChange={this.onChange}
                    renderNode={renderNode}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
