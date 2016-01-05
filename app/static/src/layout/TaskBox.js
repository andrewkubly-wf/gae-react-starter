var React = require('react');

TaskForm = require('../layout/TaskForm').TaskForm;

var IDCOUNT = 0;
var taskStore = [];

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
            taskStore = data;
            IDCOUNT = taskStore.length + 1; // Needs to be +1 so the 1st created next task has a unique ID
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
        task.id = IDCOUNT;
        var newTasks = tasks.concat([task]);
        taskStore = newTasks;
        this.setState({data: newTasks});
        IDCOUNT += 1;
    },

    handleLoadMoreClick: function() {
        var task = {id: IDCOUNT, name: 'Test Load more', due_at: Date.now(), status: 1};
        var tasks = this.state.data;
        var newTasks = tasks.concat([task]);
        taskStore = newTasks;
        this.setState({data: newTasks});
        IDCOUNT += 1;
    },

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

    render: function() {
        return(
            <div className="taskBox">
                <TaskForm onTaskSubmit={this.handleTaskSubmit} />
                <TaskList data={this.state.data} loadMoreClick={this.handleLoadMoreClick}> {this.props.children} </TaskList>
            </div>
        );
    }
});

var TaskList = React.createClass({

    getInitialState: function() {
        return {data: []};
    },


    statusFilter: function(data) {
        var newData = [];
        for(var i = 0, size = data.length; i < size; i++){
           var task = data[i];
           if(task.status != 2){
            newData.push(task);
           }
        }
        return newData;
    },

    getTaskByID: function(id){
        console.log(id)
        for(var index in taskStore){
            task = taskStore[index];
            if(task.id == id){
                return task;
            }
        }
    },

    putTaskStore: function(task_to_put){
        for(var i = 0, size=taskStore.length; i<size; i++){
            task = taskStore[i];
            if(task_to_put.id == task.id){
                taskStore[i] = task_to_put;
            }
        }
    },

    handleStatusUpdate: function(id) {
        current_task = this.getTaskByID(id);

        if(current_task.status != 2){
            current_task.status = 2;
        }
        else if(current_task.status == 2){
            current_task.status = 1;
        }
        this.putTaskStore(current_task);
        newData = this.statusFilter(taskStore);
        this.setState({data: newData});
    },

    componentWillReceiveProps: function(nextProps) {
        filtered_data = this.statusFilter(nextProps.data);
        this.setState({data: filtered_data});
    },


    render: function() {
        statusUpdateFunction = this.handleStatusUpdate;
        var TaskNodes = this.state.data.map(function(task) {
            return (<Task due_at={task.due_at} handleStatusUpdate={statusUpdateFunction} id={task.id}>{task.name}</Task>);
        });
        return(<div className='taskList'>{ TaskNodes } <LoadMoreButton onClick={this.props.loadMoreClick} /></div>);
    }
});

var LoadMoreButton = React.createClass({

    render: function() {
        return (<div onClick={this.props.onClick} className='loadMoreButton'>Load More</div>)
    }
});

var Task = React.createClass({
    getInitialState: function(){
        return {hover: false};
    },

    updateStatus: function() {
        this.props.handleStatusUpdate(this.props.id);
    },

    handleHover: function() {
        this.setState({hover: !this.state.hover});
    },

    render: function() {

        // Determine the hover state
        if(this.state.hover){
            icon_class = 'taskIcon taskIconHover';
        }
        else {
            icon_class = 'taskIcon';
        }

        // Return the task jsx
        return (
        <div className='taskEntity'>
            <div onClick={this.updateStatus} onMouseOver={this.handleHover} onMouseLeave={this.handleHover} className={icon_class}></div>
            <div className='taskName'>{this.props.children }</div>
            <div className='taskDueAt'>{this.props.due_at}</div>
        </div>
        );
    }
});

module.exports = {
    TaskBox: TaskBox,
};