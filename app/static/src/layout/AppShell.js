var React = require('react');

TaskBox = require('../layout/TaskBox').TaskBox;


var Header = React.createClass({
    render: function() {
        return (<h1>{this.props.title}</h1>);
    }
});

var AppShell = React.createClass({
    render: function() {
        return (
            <div className='appShell'>
            <Header title='Task Panel React Learning'></Header>
            <TaskBox url={this.props.url}> {this.props.children} </TaskBox>
            </div>
        );
    }
});

module.exports = {
    AppShell: AppShell,
    Header: Header
};
