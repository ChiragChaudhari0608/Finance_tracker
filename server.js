require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));