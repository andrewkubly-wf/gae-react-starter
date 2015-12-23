React = require('react');
AppShell = require('../layout/AppShell').AppShell;

var IndexPage = React.createClass({

    render: function() {
        return (
            <AppShell title="GAE REACT PRIMER">
                <p>This is a test</p>
            </AppShell>
        );
    }
});

module.exports = {
    IndexPage: IndexPage
};