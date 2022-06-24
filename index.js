import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//  Routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello you');
});

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

//  Port Listen

app.listen('5000', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server has been runnig on port 5000');
});
