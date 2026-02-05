require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/db');

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

const cors = require("cors");
app.use(cors({
  origin: "*"
}));


// test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/notes', require('./backend/routes/noteRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
