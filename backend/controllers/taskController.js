const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      ownerId: req.user.id,
      sharedWith: [],
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ ownerId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id, title, description, deadline } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.shareTask = async (req, res) => {
  const { taskId, userId } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!task.sharedWith.includes(userId)) {
      task.sharedWith.push(userId);
    }

    await task.save();

    res.json({ message: 'Task shared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSharedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ sharedWith: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
