import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);  // exit app on DB connection failure
  });

app.use(cors());
app.use(express.json());

// Import routes
import urlRoutes from './routes/url.js';
import redirectRoutes from './routes/redirect.js';

app.use('/api', urlRoutes);
app.use('/', redirectRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

