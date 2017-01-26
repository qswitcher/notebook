import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import { deleteTask, SELECT_TASK } from '../../actions';

const Task = ({task, onDelete, onSelect, selected}) => {
    return (
        <li className={`${styles.task} ${selected ? styles.selected : ''}`} onClick={() => onSelect(task)}>
            <span>{ task.name }</span>
            <button
                onClick={() => onDelete(task)}
                type="button"
                className="close"
                aria-label="Close">
                <span aria-hidden="true">&times;</span><
            /button>
        </li>
    );
};

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onDelete(id) {
        const dispatch = this.props.dispatch;
        dispatch(deleteTask(id));
    }

    onSelect(task) {
        const dispatch = this.props.dispatch;
        dispatch({
            type: SELECT_TASK,
            payload: task
        })
    }

    render() {
        const {selected, all} = this.props;

        const tasks = all.map((task) => {
            return (<Task
                key={task['_id']}
                task={task}
                selected={selected && task['_id'] == selected['_id']}
                onDelete={this.onDelete}
                onSelect={this.onSelect}
                />)
        });

        return (
            <div className={styles['task-list']}>
                <h1>Tasks</h1>
                <ul>{tasks}</ul>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        all: state.tasks.all,
        selected: state.tasks.selected
    }
})(TaskList);
