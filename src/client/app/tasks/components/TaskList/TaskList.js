import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions';

const Task = ({task, onDelete}) => {
    return (
        <li className={styles.task}>
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
    }

    onDelete(id) {
        const dispatch = this.props.dispatch;
        dispatch(deleteTask(id));
    }

    render() {
        const tasks = this.props.all.map((task) => {
            return (<Task key={task['_id']} task={task} onDelete={this.onDelete}/>)
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
        all: state.tasks.all
    }
})(TaskList);
