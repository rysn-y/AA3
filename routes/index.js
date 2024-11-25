const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// create
router.get('/create', (req, res) => {
  res.render('create', { title: 'create' });
});

// edit
router.get('/edit', (req, res) => {
  res.render('edit', { title: 'edit' });
});

// tasks
router.get('/tasks', (req, res) => {
  res.render('tasks', { title: 'tasks' });
});


router.post('/add', async (req, res) => {
  const { name, dueDate } = req.body; // dueDate from the form data
  try {
    await Task.create({ name, dueDate });
    res.redirect('/tasks'); // Redirect to list after creation
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create task');
  }
});


router.get('/', async (req, res) => {
  try {
      const tasks = await Task.find(); // gettasks from MongoDB
      res.render('list', { tasks });  // Pass tasks to the EJS view
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});


const { MongoClient } = require('mongodb');

async function main() {
    // Connection URI
    const uri = "mongodb+srv://ryanye:gcdEd8qxge70lvSe@a3.gfyrf.mongodb.net/?retryWrites=true&w=majority&appName=a3"; 

    
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        console.log("Connected successfully to MongoDB");

        
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (e) {
        console.error(e);
    } finally {
        
        await client.close();
    }
}

main().catch(console.error);



module.exports = router;
