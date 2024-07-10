// frontend/src/components/Task/TaskList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/slices/taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div>
      <h2>My Tasks</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
