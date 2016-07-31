const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditList = require('../lib/');

const stateJson = require('./state');

const plugins = [
    PluginEditList()
];

const NODES = {
    ul_list:   props => <ul {...props.attributes}>{props.children}</ul>,
    ol_list:   props => <ol {...props.attributes}>{props.children}</ol>,
    list_item: props => <li {...props.attributes}>{props.children}</li>,
    paragraph: props => <p {...props.attributes}>{props.children}</p>,
    heading:   props => <h1 {...props.attributes}>{props.children}</h1>
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
