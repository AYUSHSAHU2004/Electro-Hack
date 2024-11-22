// Import the Mongoose library to interact with MongoDB.
const mongoose = require('mongoose');
require("dotenv").config(); // This enables you to use process.env to access variables.

// Destructure the MONGO_URL environment variable from process.env.
// This is typically defined in a .env file or the server's environment settings.
const { MONGO_URL } = process.env;

// Export a function named 'connect' to handle the database connection.
exports.connect = () => {
  // Call the mongoose.connect method to establish a connection to the MongoDB database.
  mongoose
    .connect(
      MONGO_URL, // Pass the connection string stored in MONGO_URL.
      {
      }
    )
    // If the connection is successful, execute the callback function.
    .then(() => {
      console.log('MongoDB connected successfully'); // Log a success message to the console.
    })
    // If an error occurs during connection, handle it in the catch block.
    .catch((err) => {
      console.error('MongoDB connection error:', err); // Log the error details to the console.
      console.log(err); // Optionally log the error again (redundant here but left as is from original code).
    });
};
