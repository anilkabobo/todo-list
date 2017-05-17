import { combineReducers } from 'redux';
import { todo } from './todo/reducers';

const App = combineReducers({
  todo
});

export default App;
