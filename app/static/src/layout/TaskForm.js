var React = require('react');

var TaskInputs = React.createClass({

    getInitialState: function() {
        return {name: '', due_at: '', recipient: '', location: '', active: false};
    },

    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },

    handleDueAtChange: function(e) {
        this.setState({due_at: e.target.value});
    },

    handleRecipientChange: function(e) {
        this.setState({recipient: e.target.value});
    },

    handleLocationChange: function(e) {
        this.setState({location: e.target.value});
    },

    showInputs: function(e) {
        this.setState({active: true})
    },

    submitInputs: function(e) {
        e.preventDefault();
        this.props.onFormSubmit({
            name: this.state.name,
            due_at: this.state.due_at,
            location: this.state.location,
            recipient: this.state.recipient,
            status: 1
        });
        this.setState({name: '', due_at: '', recipient: '', location: '', active: false});
    },

    render: function() {

        // Determine if we need to hide the inputs
        var classNames = 'hidden_input ';
        if (this.state.active) {
            classNames = '';
        }
        var due_at_class_name = classNames.concat('dateInput');
        var recipient_class_name = classNames.concat('subTextInputL');
        var location_class_name = classNames.concat('subTextInputR');
        var submit_class_name = classNames.concat('submitInput');

        return(
            <div className='taskInputs'>
                <input
                    type="text"
                    placeholder="Add New Task"
                    className='mainTextInput'
                    value={this.state.name}
                    onClick={this.showInputs}
                    onChange={this.handleNameChange}/>
                <div className='hiddenInputs'>
                    <input
                        type="text"
                        className={recipient_class_name}
                        placeholder="Enter a recipient"
                        value={this.state.recipient}
                        onChange={this.handleRecipientChange}/>
                    <input
                        type="date"
                        className={due_at_class_name}
                        placeholder="Choose a due date"
                        value={this.state.due_at}
                        onChange={this.handleDueAtChange}/>
                    <input
                        type="text"
                        className={location_class_name}
                        placeholder="Enter a location"
                        value={this.state.location}
                        onChange={this.handleLocationChange}/>
                    <input type="submit" className={submit_class_name} value="Add" onClick={this.submitInputs}/>
                </div>
            </div>
            );
    }
});

var TaskForm = React.createClass({

    render: function() {
        return(
            <form className="taskForm">
                <TaskInputs onFormSubmit={this.props.onTaskSubmit}/>
            </form>
        );
    }
});

module.exports = {
    TaskForm: TaskForm,
};