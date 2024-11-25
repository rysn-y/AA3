const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import Task model

// list of tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // tasks from MongoDB
    res.render('list', { tasks });  // Render list and move tasks
  } catch (err) {
    console.error('Error retrieving tasks:', err.message);
    res.status(500).send('Error retrieving tasks');
  }
});

// Create Task form
router.get('/create', (req, res) => {
  res.render('create'); 
});

//submission to add a new task
router.post('/add', async (req, res) => {
  const { name, dueDate } = req.body; // Extract form data
  try {
    await Task.create({ name, dueDate }); // Save to MongoDB
    res.redirect('/tasks');              // Redirect to the task list
  } catch (err) {
    console.error('Error saving task:', err.message);
    res.status(500).send('Error saving task');
  }
});

module.exports = router;
