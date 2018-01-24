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

const renderNode = (props) => {
    switch (props.node.type) {
        case 'paragraph':  return <p {...props.attributes}>{props.children}</p>;
        case 'heading':    return <h1 {...props.attributes}>{props.children}</h1>;
        case 'subheading': return <h2 {...props.attributes}>{props.children}</h2>;
    }
};


class Example extends React.Component {
    constructor (props) {
        super(props);
        this.state = { value: initialValue };
    }

    onChange = ({value}) => {
        this.setState({value});
    }

    onInsertTable = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.insertTable)
        );
    }

    onInsertColumn = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.insertColumn)
        );
    }

    onInsertRow = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.insertRow)
        );
    }

    onRemoveColumn = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.removeColumn)
        );
    }

    onRemoveRow= () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.removeRow)
        );
    }

    onRemoveTable = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.removeTable)
        );
    }

    onToggleHeaders = () => {
        const { value } = this.state;

        this.onChange(
            value.change().call(tablePlugin.changes.toggleHeaders)
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
