var React = require('react');

TaskForm = require('../layout/TaskForm').TaskForm;

var TaskBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    loadCommentsFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    handleTaskSubmit: function(task) {
        var tasks = this.state.data;
        task.id = Date.now();
        var newTasks = tasks.concat([task]);
        this.setState({data: newTasks});

        // Uncomment if you actually want to post to the server
        // $.ajax({
        //   url: this.props.url,
        //   dataType: 'json',
        //   type: 'POST',
        //   data: task,
        //   success: function(data) {
        //     this.setState({data: data});
        //   }.bind(this),
        //   error: function(xhr, status, err) {
        //     this.setState({data: tasks});
        //     console.error(this.props.url, status, err.toString());
        //   }.bind(this)
        // });
    },

    render: function() {
        return(
            <div className="taskBox">
                <TaskForm onTaskSubmit={this.handleTaskSubmit} />
                <TaskList data={this.state.data}> {this.props.children} </TaskList>
            </div>
        );
    }
});

var TaskList = React.createClass({
    render: function() {
        var TaskNodes = this.props.data.map(function(task) {
            return (<Task due_at={task.due_at}>{task.name}</Task>);
        });
        return(<div className='taskList'>{ TaskNodes } <LoadMoreButton /></div>);
    }
});

var LoadMoreButton = React.createClass({

    handleClick: function() {

    },

    render: function() {
        return (<div onClick={this.handleClick} className='loadMoreButton'>Load More</div>)
    }
});

var Task = React.createClass({
    render: function() {
        return (
            <div className='taskEntity'>
                <div className='taskIcon'></div>
                <div className='taskName'>{this.props.children }</div>
                <div className='taskDueAt'>{this.props.due_at}</div>
            </div>
        );
    }
});

module.exports = {
    TaskBox: TaskBox,
};