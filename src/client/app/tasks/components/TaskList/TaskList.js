import React from 'react';
import styles from './styles.less';

const Task = ({name}) => {
    return (
        <li className={styles.task}>{ name }</li>
    );
};

class TaskList extends React.Component {
    render() {
        const task_names = ['Mow Lawn', 'Goober'];
        const tasks = task_names.map((name) => {
            return (<Task key={name} name={name}/>)
        });

        return (
            <div className={styles['task-list']}>
                <h1>Tasks</h1>
                <ul>{tasks}</ul>
            </div>
        );
    }
}

export default TaskList;
