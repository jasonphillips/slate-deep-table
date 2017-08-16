const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditTable = require('../lib/');

const stateJson = require('./state');

const tablePlugin = PluginEditTable();
const plugins = [
    tablePlugin
];

const schema = {
    nodes: {
        paragraph:  props => <p {...props.attributes}>{props.children}</p>,
        heading:    props => <h1 {...props.attributes}>{props.children}</h1>,
        subheading: props => <h2 {...props.attributes}>{props.children}</h2>,
    }
};

Object.assign(schema.nodes, tablePlugin.utils.getDefaultRenderers());


const Example = React.createClass({
    getInitialState: function() {
        return {
            state: Slate.Raw.deserialize(stateJson, { terse: true })
        };
    },

    onChange: function(state) {
        this.setState({
            state: state
        });
    },

    onInsertTable: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.insertTable(state.transform())
                .apply()
        );
    },

    onInsertColumn: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.insertColumn(state.transform())
                .apply()
        );
    },

    onInsertRow: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.insertRow(state.transform())
                .apply()
        );
    },

    onRemoveColumn: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.removeColumn(state.transform())
                .apply()
        );
    },

    onRemoveRow: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.removeRow(state.transform())
                .apply()
        );
    },

    onRemoveTable: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.removeTable(state.transform())
                .apply()
        );
    },

    onToggleHeaders: function() {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.toggleHeaders(state.transform())
                .apply()
        );
    },

    renderNormalToolbar: function() {
        return (
            <div className="buttons">
                <button onClick={this.onInsertTable}>Insert Table</button>
            </div>
        );
    },

    renderTableToolbar: function() {
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
    },

    render: function() {
        let { state } = this.state;
        let isTable = tablePlugin.utils.isSelectionInTable(state);

        return (
            <div>
                {isTable? this.renderTableToolbar() : this.renderNormalToolbar()}
                <Slate.Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    state={state}
                    onChange={this.onChange}
                    schema={schema}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
