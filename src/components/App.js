import React, { Component } from 'react';
import TasksContainer from '../containers/tasks-container';

export default class AppComponent extends Component {
    render(){
        return(
         <div><TasksContainer /></div>
        )
    }
}