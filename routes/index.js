const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// About Me page
router.get('/create', (req, res) => {
  res.render('create', { title: 'create' });
});

// Projects page
router.get('/edit', (req, res) => {
  res.render('edit', { title: 'edit' });
});

// Contact Me page
router.get('/tasks', (req, res) => {
  res.render('tasks', { title: 'tasks' });
});


router.post('/add', async (req, res) => {
  const { name, dueDate } = req.body; // Extract dueDate from the form data
  try {
    await Task.create({ name, dueDate });
    res.redirect('/tasks'); // Redirect to the task list after creation
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create task');
  }
});


router.get('/', async (req, res) => {
  try {
      const tasks = await Task.find(); // Fetch all tasks from MongoDB
      res.render('list', { tasks });  // Pass tasks to the EJS view
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});





module.exports = router;
