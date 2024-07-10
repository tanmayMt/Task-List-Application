
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharedTasks } from '../../redux/slices/taskSlice';
import TaskItem from '../Task/TaskItem';

const SharedTaskList = () => {
  const dispatch = useDispatch();
  const { sharedTasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getSharedTasks());
  }, [dispatch]);

  return (
    <div>
      <h2>Shared Tasks</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {sharedTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default SharedTaskList;
