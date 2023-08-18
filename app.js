const express = require('express');
const cors = require("cors");
const cookie = require('cookie-parser');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(cors({ origin: true, credentials: true }))
app.use(cookie())
// Connect to MongoDB
app.use(express.json());

// Middleware

// Routes
app.use('/employees', employeeRoutes);

// Start the server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
