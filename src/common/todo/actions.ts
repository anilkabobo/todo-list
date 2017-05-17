import { ToDo } from '../interfaces/Todo';
import actions from '../actions';

export function getAllTasks() {
  return (dispatch: Function) => {
    dispatch({
      type: 'GET_ALL_TASKS_START',
    })
    dispatch(actions.api.fetchAllTasks()).then((data: Array<Object>) => {
      dispatch({
        type: 'GET_ALL_TASKS_SUCCESS',
        payload: data
      })
    }).catch(() => {
      dispatch({
        type: 'GET_ALL_TASKS_FAILED'
      })
    })
  };
}

export function addTask(description:String) {
  return (dispatch: Function) => {
    dispatch({
      type: 'ADD_TODO',
      payload: description
    })
    dispatch(actions.api.addToDo(description)).then(() => {
      dispatch(getAllTasks())
    })
  };
}

export function deleteTask(item:ToDo) {
  return (dispatch: Function) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: item
    })
    dispatch(actions.api.deleteToDo(item.ID)).catch(() => {
      dispatch({type: 'DELETE_TASK_FAILED'})
    })
  };
}

export function editTask(item:ToDo, newValue:string) {
  return (dispatch: Function) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: { item, newValue}
    })
    dispatch(actions.api.editToDo(item.ID, newValue)).catch(() => {
      dispatch({type: 'EDIT_TASK_FAILED'})
    })
  };
}
