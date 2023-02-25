const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error to MongoDB', error);
  }
}

module.exports = dbConnect;
