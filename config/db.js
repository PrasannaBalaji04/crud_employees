require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const url= process.env.DATABASE_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    process.exit(1);
  }
}

module.exports = connectDB;