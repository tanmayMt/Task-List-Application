
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, shareTask } from '../../redux/slices/taskSlice';

const TaskItem = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [shareUsername, setShareUsername] = useState('');
  const dispatch = useDispatch();

  const updateHandler = () => {
    dispatch(updateTask({ id: task._id, title, description, deadline }));
    setEditing(false);
  };

  const shareHandler = () => {
    dispatch(shareTask({ taskId: task._id, userId: shareUsername }));
  };

  return (
    <div>
      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button onClick={updateHandler}>Update</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{new Date(task.deadline).toLocaleString()}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <input
            type="text"
            placeholder="Share with Username"
            value={shareUsername}
            onChange={(e) => setShareUsername(e.target.value)}
          />
          <button onClick={shareHandler}>Share</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
