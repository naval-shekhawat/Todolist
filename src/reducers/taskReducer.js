var data =  require('../data.json').data;

export default function(tasks=[], action){
    switch (action.type) {
        case 'ADD_TASK':
          return [
            ...tasks,
            {
              "id":tasks.length + 1,
              "name": action.payload,
              "inProgress": false,
              "todo": true,
              "done": false
            }
        ];

        case 'DRAG_DROP' :
          let taskStatus = action.payload.taskStatus;
          return tasks.map(function(task){
                if(task.id === action.payload.task.id){
                  task['done'] = false;
                  task['todo'] = false;
                  task['inProgress'] = false;

                  task[taskStatus] = true;
                }

                return task;
          });
    
        default:
            break;
    }

    return data;
}