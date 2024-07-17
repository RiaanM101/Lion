const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));

// Serve the React app on all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log('MONGO_URI:', process.env.MONGO_URI);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
});
