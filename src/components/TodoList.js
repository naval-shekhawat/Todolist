import React from 'react';
//import Draggable from 'react-draggable';
import './TodoList.css';


export const TodoList = (props) => {
  let tasks = props.tasks;
  let cls = "todoList ";
  if(props.header === 'To Do') {
    cls += 'todo';
  }else if(props.header === 'In progress') {
      cls += 'progress';
  }else {
    cls += 'done';
  }
  let renderCards = tasks.map(function(task, key){
      return <li key={task.id} draggable={true}
                    onDragStart={(event)=>{props.dragStart(task,event)}}
                    onDrag={(event)=>{ props.drag(task,event)}}>
                    {task.name}
              </li>
  })
    return <div className={cls}
                onDrop={(event)=>props.drop(event)} 
                onDragOver={(event)=>{ props.dragover(event)}}>
                <div className="header">
                    <h4 className="headerText">{props.header}</h4>
                    <div className="count">
                        <b>{tasks.length}</b>
                    </div>
                </div>
                    <ul>
                        {renderCards}
                    </ul>
            </div>
}