import React from 'react';
import TaskList from './components/TaskList/TaskList';
import Form from './components/Form/Form';
import styles from './styles.less';

class TaskApp extends React.Component {
    render() {
        return <div className={styles['tasks-container']}>
                <TaskList />
                <Form />
            </div>
    }
}

export default TaskApp;
