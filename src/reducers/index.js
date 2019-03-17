import { combineReducers } from 'redux';
import TasksReducer from './taskReducer';
const rootReducer = combineReducers({
  tasks: TasksReducer
});

export default rootReducer;
