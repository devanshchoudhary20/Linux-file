import { useSettings } from "../Context/GlobalContext";



export const getRepeatValue = (repeat: { frequency: number; intervals: string; dayOfWeek: any[]; }) => {
    let value = '';
    const dayName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    // debugger
    if (repeat.frequency === 1) {
        value = `After Every ${repeat.intervals.interval.toLowerCase()}`;
        if (repeat.intervals.interval === 'Week') {
            // @ts-ignore
            value += ` on ${repeat.dayOfWeek.map((days: string | number) => dayName[days])}`;
        }
    } else {
        if (repeat.intervals === 'Week') {
            value = `After Every ${repeat.frequency} ${repeat.intervals.interval.toLowerCase()} on ${repeat.dayOfWeek.map(days => dayName[days])}`;
        } else {
            value = `After Every ${repeat.frequency} ${repeat.intervals.interval.toLowerCase()}`;
        }
    }
    // debugger
    return value;
};


export const DateFilter = (timestamp : any) => {
    const days = [
      "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
    const getDate = new Date(timestamp).getDate;
    const getMonth = new Date(timestamp).getMonth;
    const Day = new Date(timestamp).getDay;
    // @ts-ignore
    const getDay = days[Day];
    return ({
      date : getDate,
      day : getDay,
      month : getMonth,
      monthName : monthNames[getMonth]
    })
};

// Get Updated Value after Edit

  export const updateTaskInLocalStorage = (taskId: any, changedState: { checklist?: any; })=>{
    // const {state,setState} = useSettings(); 
    const currentState = JSON.parse(localStorage.getItem('tasksState'));
  
    const newState = JSON.parse(JSON.stringify(currentState));
    const stateSetting = { isUpdated: false, newState: [] };
    let taskUpdated = false;
  
    // Iterate through places and tasks to find the matching task
    newState.places.forEach((place: { tasks: any[]; }) => {
      const taskIndex = place.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        // Update the task with the changed values
        place.tasks[taskIndex] = { ...place.tasks[taskIndex], ...changedState };
        taskUpdated = true;
      }
    });
    // debugger
    // console.log(newState);
    if (taskUpdated) {
      localStorage.setItem('tasksState', JSON.stringify(newState));
      // setState()
      return {
        isUpdated: true,
        newState: newState
      };
    } else {
      console.warn(`Task with id ${taskId} not found`);
      return false; 
    }
  }
  
  // Function to get changed values
 export const getChangedValues = (initial, updated)=>{

  // const {state,setState} = useSettings(); 
    const changes = {};
    Object.keys(updated).forEach(key => {
      if (JSON.stringify(initial[key]) !== JSON.stringify(updated[key])) {
        changes[key] = updated[key];
      }
    });
    return changes;
  }

  //remove Item from LocalStorage

 export const removeTaskFromLocalStorage = (taskId) => {
  const currentState = JSON.parse(localStorage.getItem('tasksState'));

  const newState = JSON.parse(JSON.stringify(currentState));

  let taskRemoved = false;
  const stateSetting = { isUpdated: false, newState: [] };

  newState.places = newState.places.map(place => {
    const updatedTasks = place.tasks.filter(task => task.id !== taskId);
    
    if (updatedTasks.length < place.tasks.length) {
      taskRemoved = true;
    }

    return { ...place, tasks: updatedTasks };
  });

  if (taskRemoved) {
    localStorage.setItem('tasksState', JSON.stringify(newState));
    return {
      isUpdated: true,
      newState: newState
    };
  } else {
    console.warn(`Task with id ${taskId} not found`);
    return false; 
  }
}


  //Mark as Done

  export const markTaskAsDone =(taskId) => {
    const currentState = JSON.parse(localStorage.getItem('tasksState'));
  
    const newState = JSON.parse(JSON.stringify(currentState));
  
    let taskUpdated = false;
  
    newState.places.forEach(place => {
      place.tasks.forEach(task => {
        if (task.id === taskId) {
          task.isCompleted = true;
          task.completionDate = Date.now(); // Set completion date to current timestamp
          taskUpdated = true;
        }
      });
    });
  
    if (taskUpdated) {
      localStorage.setItem('tasksState', JSON.stringify(newState));
      return true; 
    } else {
      console.warn(`Task with id ${taskId} not found`);
      return false; 
    }
  }

  //mark as undone

  export const markTaskAsUndone =(taskId) => {
    const currentState = JSON.parse(localStorage.getItem('tasksState'));
  
    const newState = JSON.parse(JSON.stringify(currentState));
  
    let taskUpdated = false;
  
    newState.places.forEach(place => {
      place.tasks.forEach(task => {
        if (task.id === taskId) {
          task.isCompleted = false;
          task.completionDate = Date.now(); // Set completion date to current timestamp
          taskUpdated = true;
        }
      });
    });
  
    if (taskUpdated) {
      localStorage.setItem('tasksState', JSON.stringify(newState));
      return true; 
    } else {
      console.warn(`Task with id ${taskId} not found`);
      return false; 
    }
  }
