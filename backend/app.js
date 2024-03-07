// app.js

const express = require('express');
const connectDB = require('./config/database'); // Assuming this is your MongoDB connection configuration
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const transformerRoutes = require('./routes/transformerRoutes');

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Other middleware and routes setup...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/transformers', transformerRoutes);
