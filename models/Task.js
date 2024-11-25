const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Task name
  dueDate: { type: Date, required: true },    // Due date
});

module.exports = mongoose.model('Task', taskSchema);
