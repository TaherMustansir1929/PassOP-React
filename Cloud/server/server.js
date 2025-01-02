import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Password } from './models/password.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all passwords
app.get('/api/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new password
app.post('/api/passwords', async (req, res) => {
  const password = new Password(req.body);
  try {
    const newPassword = await password.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update password
app.put('/api/passwords/:id', async (req, res) => {
  try {
    const password = await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(password);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete password
app.delete('/api/passwords/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: 'Password deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));