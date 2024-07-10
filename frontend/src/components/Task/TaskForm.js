// frontend/src/components/Task/TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/slices/taskSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, description, deadline }));
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
