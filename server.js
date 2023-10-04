const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connection } = require("./db")

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/user', authRoutes);
app.use('/api/todo', todoRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}, () => {
  console.log('MongoDB connected');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




