const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ToDoApp', {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Fail!!!');
  }
}

module.exports = dbConnect;
