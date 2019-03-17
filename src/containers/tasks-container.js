import React, {Component} from 'react';
import {TodoList} from '../components/TodoList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTask} from '../actions/addTask';
import { dragDrop } from '../actions/dragDrop';
import '../containers/tasks-container.css';

 class TasksContainer extends Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.drop = this.drop.bind(this);
        this.dragStart= this.dragStart.bind(this);
        this.drag= this.drag.bind(this);
        this.dragover=this.dragover.bind(this);
        this.state = {
            newProjectName:'',
            currentTaskDragged : ''
        }
    }

    addTask(){
        this.props.addTask(this.state.newProjectName)
    }

    handleInputChange(event){
        this.setState({
            newProjectName : event.target.value
        })
    }

    drag(task,event) {
        event.preventDefault();
    }
  
    dragover(event) {
      event.preventDefault();
    }

    dragStart(task,event) {
        this.setState({currentTaskDragged:task});
    }

    drop(event) {
        event.preventDefault();
        let elem = event.target.nodeName ==='LI'
                   ? event.target.parentElement.parentElement
                   : event.target.parentElement;
        let cls =  elem.getAttribute('class') != null?elem.getAttribute('class').split(' ')[1]:'';
        switch(cls) {
          case 'progress':
                this.props.dragDrop(this.state.currentTaskDragged,'inProgress');break;
          case 'todo':
                this.props.dragDrop(this.state.currentTaskDragged,'todo'); break;
          case 'done':
                this.props.dragDrop(this.state.currentTaskDragged,'done'); break
          default:
          break;
        }
        return false;
    }

    render(){
        let tasks = this.props.tasks;

        let todoTasks = tasks.filter((task,key) => {
            return task.todo;
        });

        let progressTasks = tasks.filter((task,key) => {
           return task.inProgress;
        });

        let doneTasks = tasks.filter((task,key) => {
           return task.done;
        })

        return (
            <div className="main-header">
               <div className="add-project-section">
                    <input type='text' onChange={this.handleInputChange}/>
                    <button onClick={this.addTask}>Add</button>
               </div>
              
                <div className="lists-wrapper">
                    <TodoList className="list" tasks={todoTasks} header="To Do" 
                              drop={this.drop} 
                              dragStart={this.dragStart} 
                              drag={this.drag} 
                              dragover={this.dragover} />
                    <TodoList className="list" tasks={progressTasks} header="In progress" 
                              drop={this.drop} 
                              dragStart={this.dragStart} 
                              drag={this.drag} 
                              dragover={this.dragover} />
                    <TodoList className="list" tasks={doneTasks} header="Completed"
                              drop={this.drop} 
                              dragStart={this.dragStart} 
                              drag={this.drag} 
                              dragover={this.dragover} />
                </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTask:addTask, dragDrop: dragDrop}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TasksContainer)