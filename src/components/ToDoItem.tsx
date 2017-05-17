import RX = require('reactxp');
import { ToDo } from '../common/interfaces/Todo';
import { Event } from '../common/interfaces/Event';
import actions from '../common/actions';
import { bindActionCreators } from 'redux'
const { connect } = require('react-redux');

export interface ToDoProps extends RX.CommonProps {
    item?: ToDo;
    deleteTask?: Function;
    editTask?: Function;
}

const styles = {
    listItem: {
        listStyle: 'none',
        textAlign: 'center',
        color: '#fff',
        margin: '0.7rem 0',
        fontSize: '18px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    close: RX.Styles.createButtonStyle({
      marginLeft: 15
    }),
    description: {
      margin: 0,
      background: 'transparent',
      border: 'none',
      color: '#000',
      width: '200px',
      height: '25px'
    },
    editable: {
      width: '200px',
      height: '25px',
      boxSizing: 'border-box'
    }
};

function mapDispatchToProps(dispatch: any) {
  return {
    deleteTask: bindActionCreators(actions.todo.deleteTask, dispatch),
    editTask: bindActionCreators(actions.todo.editTask, dispatch),
  }
}

@connect(null, mapDispatchToProps)
class ToDoItem extends RX.Component<ToDoProps, {}> {
  private item: ToDo;
  private textInput: any;

  state = {
    startedEditing: false,
    value: ''
  }

  deleteTask(item:ToDo) {
    this.props.deleteTask(item);
  }

  editTask() {
    if (this.state.startedEditing) {
      this.props.editTask(this.props.item, this.textInput.value)
    }
    this.setState({startedEditing: !this.state.startedEditing})

  }

  submitTask(e: Event){
    const item = this.props.item;
    if (e.charCode === 13) {
    }
  }

  handleChange(e:Event) {
    this.setState({value: e.target.value})
  }

  componentWillMount() {
    this.setState({value: this.props.item.Description})
  }

  render() {
    const item = this.props.item;

    return (
        <li style={styles.listItem}>
          <input
            type="text"
            style={this.state.startedEditing ? styles.editable : styles.description}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            disabled={!this.state.startedEditing}
            ref={(input) => { this.textInput = input; }}
          />
          <RX.Button onPress={this.editTask.bind(this)} style={styles.close}>{!this.state.startedEditing ? 'Edit' : 'Submit'}</RX.Button>
          <RX.Button onPress={() => this.deleteTask(item)} style={styles.close}>x</RX.Button>
        </li>
    );
  }
}

export default ToDoItem;
