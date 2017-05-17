import RX = require('reactxp');
import { Map } from 'immutable';
import ToDoItem from './ToDoItem';
import { ToDo } from '../common/interfaces/Todo';
import actions from '../common/actions';
import { bindActionCreators } from 'redux'
const { connect } = require('react-redux');

interface ToDoListProps extends RX.CommonProps {
    todo?: Map<string, any>;
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20px',
    flexDirection: 'column'
  },
    list: {
        width: '300px',
        margin: '1.5em auto',
        padding: 0
    },
    loader: RX.Styles.createViewStyle({
      alignSelf: 'center'
    })
};

const mapStateToProps = (state: any) => {
  return {
    items: state.todo.get('items'),
    isFetchingFailed: state.todo.get('isFetchingFailed')
  }
};

function mapDispatchToProps(dispatch: any) {
  return {
    getList: bindActionCreators(actions.todo.getAllTasks.bind(dispatch), dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class ToDoList extends RX.Component<any, void> {

  componentWillMount() {
    const { getList } = this.props;
    getList()
  }

  renderItem(item: ToDo) {
    return <ToDoItem item={item} key={item.ID.toString()} />
  }

  render() {
    const { items, isFetchingFailed } = this.props;
    return (
      <div style={styles.container}>
        <ul style={styles.list}>
          {!!items.size && items.map(this.renderItem)}
        </ul>
        {items.length === 0 && !isFetchingFailed && <RX.ActivityIndicator color="#fff" style={styles.loader} />}
        {items.size === 0 && 'No tasks yet'}
        {isFetchingFailed &&
          <RX.Button onPress={this.props.getList}>
            Failed to get tasks, try again
          </RX.Button>
        }
      </div>
    );
  }
}

export default ToDoList;
