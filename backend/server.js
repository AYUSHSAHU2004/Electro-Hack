// Import the Express framework, which is used to create the web server.
const express = require('express');
require('./config/db.js').connect();
// Initialize the Express application.
const app = express();

// Import the dotenv package to load environment variables from a .env file.
require("dotenv").config(); // This enables you to use process.env to access variables.

// Import the cors package to handle Cross-Origin Resource Sharing.
const cors = require('cors'); // CORS allows your application to interact with resources from different origins.

// Use the CORS middleware in your Express app.
app.use(cors()); // This will enable CORS for all routes, allowing your server to accept requests from any domain.

// Use the JSON middleware to automatically parse incoming JSON payloads in request bodies.
app.use(express.json()); // Makes `req.body` available as a JSON object in your routes.

// Destructure the PORT environment variable from process.env.
// This variable specifies the port on which the server will listen.
const { PORT } = process.env;

// Define a GET route for the root URL ("/") of your application.
app.get("/", (req, res) => {
    // Send an HTML response when a user accesses the root route.
    res.send("<h1>Welcome</h1>"); // Response contains a simple HTML heading.
});

app.use('/users',require('./Routes/userRoutes.js'));
app.use('/problems',require('./Routes/problemRoutes.js'));
// Start the server and have it listen on the specified PORT.
app.listen(PORT, () => {
    // Log a message to the console when the server starts successfully.
    console.log(`Server is running at ${PORT}`);
});
