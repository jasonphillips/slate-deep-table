const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditTable = require('../lib/');

const stateJson = require('./state');

const plugins = [
    PluginEditTable()
];

const NODES = {
    table:      props => <table><tbody {...props.attributes}>{props.children}</tbody></table>,
    table_row:  props => <tr {...props.attributes}>{props.children}</tr>,
    table_cell: props => <td {...props.attributes}>{props.children}</td>,
    paragraph:  props => <p {...props.attributes}>{props.children}</p>,
    heading:    props => <h1 {...props.attributes}>{props.children}</h1>
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

    renderNode: function(node) {
        return NODES[node.type];
    },

    render: function() {
        return (
            <Slate.Editor
                placeholder={'Enter some text...'}
                plugins={plugins}
                state={this.state.state}
                onChange={this.onChange}
                renderNode={this.renderNode}
            />
    );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
