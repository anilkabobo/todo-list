import RX = require('reactxp');
import actions from '../common/actions';
const { InitialState } = require('../common/todo/reducers')
import { ToDo } from '../common/interfaces/Todo';
import { Event } from '../common/interfaces/Event';
import { bindActionCreators } from 'redux'
const { connect } = require('react-redux');

export interface AddToDoProps extends RX.CommonProps {
    addTask?: Function;
}

const styles = {
    input: RX.Styles.createTextInputStyle({
        width: 285,
        height: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#111',
        fontSize: 20,
        margin: 0,
        alignSelf: 'center',
        paddingLeft: 15
    })
};

function mapDispatchToProps(dispatch: any) {
  return {
    addTask: bindActionCreators(actions.todo.addTask, dispatch),
  }
}

@connect(null, mapDispatchToProps)
class AddToDo extends RX.Component<AddToDoProps, void> {

  submitTask(e: Event) {
    if (e.keyCode === 13) {
      this.props.addTask(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
        <RX.TextInput style={styles.input} onKeyPress={this.submitTask.bind(this)}/>
    );
  }
}

export default AddToDo;
