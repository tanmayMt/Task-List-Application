// backend/routes/taskRoutes.js
const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  shareTask,
  getSharedTasks,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/', protect, updateTask);
router.post('/share', protect, shareTask);
router.get('/shared', protect, getSharedTasks);

module.exports = router;
