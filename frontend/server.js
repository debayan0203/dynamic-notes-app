require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// 👇 THIS MUST BE HERE
connectDB();

// middleware
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const cors = require("cors");

app.use(cors({
    origin: "*", // later you can restrict this
}));

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/notes', noteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
