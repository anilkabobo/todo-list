import RX = require('reactxp');
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

const { Provider }  = require('react-redux');

interface AppState {
    toggleValue?: boolean;
}

interface AppProps extends RX.CommonProps  {
    store: any;
}

const styles = {
    container: {
        width: '100%',
        padding: '100px 0 0',
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

class App extends RX.Component<AppProps, AppState> {

    render(): JSX.Element | null {
      const { store } = this.props;
        return (
          <Provider store={ store }>
            <div style={styles.container}>
              <AddToDo />
              <ToDoList />
            </div>
          </Provider>
        );
    }
}

export = App;
