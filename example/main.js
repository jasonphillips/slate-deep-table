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
        table:      props => <table><tbody {...props.attributes}>{props.children}</tbody></table>,
        table_row:  props => <tr {...props.attributes}>{props.children}</tr>,
        table_cell: (props) => {
            let align = props.node.get('data').get('align') || 'left'
            return <td style={{ textAlign: align }} {...props.attributes}>{props.children}</td>;
        },
        paragraph:  props => <p {...props.attributes}>{props.children}</p>,
        heading:    props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

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

    onSetAlign: function (event, align) {
        let { state } = this.state;

        this.onChange(
            tablePlugin.transforms.setColumnAlign(state.transform(), align)
                .apply()
        );
    },

    renderNormalToolbar: function() {
        return (
            <div>
                <button onClick={this.onInsertTable}>Insert Table</button>
            </div>
        );
    },

    renderTableToolbar: function() {
        return (
            <div>
                <button onClick={this.onInsertColumn}>Insert Column</button>
                <button onClick={this.onInsertRow}>Insert Row</button>
                <button onClick={this.onRemoveColumn}>Remove Column</button>
                <button onClick={this.onRemoveRow}>Remove Row</button>
                <button onClick={this.onRemoveTable}>Remove Table</button>
                <br />
                <button onClick={(e) => this.onSetAlign(e, 'left') }>Set align left</button>
                <button onClick={(e) => this.onSetAlign(e, 'center') }>Set align center</button>
                <button onClick={(e) => this.onSetAlign(e, 'right') }>Set align right</button>
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
