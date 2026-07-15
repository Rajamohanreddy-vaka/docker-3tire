const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tasksdb';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const TaskSchema = new mongoose.Schema({ title: String });
const Task = mongoose.model('Task', TaskSchema);

app.get('/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).json({ status: 'UP', database: 'CONNECTED' });
  }
  return res.status(500).json({ status: 'DOWN', database: 'DISCONNECTED' });
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.status(201).json(newTask);
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));