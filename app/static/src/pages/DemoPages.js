React = require('react');
AppShell = require('../layout/AppShell').AppShell;

var IndexPage = React.createClass({

    displayName: 'IndexPage',

    render: function() {
        return (
            <AppShell url={this.props.url} />
        );
    }
});

module.exports = {
    IndexPage: IndexPage
};