import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js'; // <-- Use this instead if needed

dotenv.config();

const app = express();

// Basic environment variable check
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI not set in environment variables');
  process.exit(1);
}

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(helmet());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes); // <-- the correct one

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
