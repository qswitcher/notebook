import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';

const Task = ({task}) => {
    return (
        <li className={styles.task}>{ task.name }</li>
    );
};

class TaskList extends React.Component {
    render() {
        const tasks = this.props.all.map((task) => {
            return (<Task key={task['_id']} task={task}/>)
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
