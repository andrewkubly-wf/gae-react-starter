var React = require('react');


var Header = React.createClass({
    render: function() {
        return (<h1>{ this.props.title}</h1>);
    }
});

var AppShell = React.createClass({
    render: function() {
        return (<div>
                <Header title={this.props.title} />

                <div>{ this.props.children }</div>
            </div>);
    }
});


module.exports = {
    AppShell: AppShell,
    Header: Header
};