const { RedusersMapObject } = require('redux');
import { Action } from '../interfaces/Action';
import { ToDo } from '../interfaces/Todo';
import { List, Record } from 'immutable';

export const InitialState = Record({
  items: [],
  editableTask: {},
  isFetchingFailed: false
});

const initialState = new InitialState;
let prevState = new InitialState;

export const  todo = (state = initialState, action: Action) => {
  const items = state.get('items');

  switch (action.type) {
    case 'ADD_TASK':
      prevState = state;
      return state.set('items', items.push({Description: action.payload, ID: `temp${items.size}`}));
    case 'GET_ALL_TASKS_START':
      return state.set('isFetchingFailed', false)
    case 'GET_ALL_TASKS_SUCCESS':
      return state.set('items', List(action.payload).sortBy((item:ToDo) => item.ID))
    case 'GET_ALL_TASKS_FAILED':
      return state.set('isFetchingFailed', true);
    case 'DELETE_TASK':
      prevState = state;
      return state.set('items', items.remove(items.indexOf(action.payload), 1));
    case 'DELETE_TASK_FAILED':
    case 'EDIT_TASK_FAILED':
    case 'ADD_TASK_FAILED':
      return state.set('items', prevState.get('items'));
    case 'EDIT_TASK':
      prevState = state;
      const newItem = {
        ID: action.payload.item.ID,
        Description: action.payload.newValue
      }
      const newItemsList =  state.get('items').update(items.indexOf(action.payload.item), (item:ToDo) => { return newItem});
      return state.set('items', newItemsList);
    default:
      return state;
  }};
