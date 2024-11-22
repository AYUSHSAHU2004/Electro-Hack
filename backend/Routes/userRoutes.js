// Importing required modules
const express = require('express');  // Express framework
const router = express.Router();     // Router to define routes
const userController = require('../Controllers/UserController.js');  // Controller that handles the business logic

// Route to handle Public user sign-up
// POST request to '/SignUpPublic' triggers the signUpPublic function in the userController
router.post('/SignUpPublic', userController.signUpPublic);

// Route to handle Authority user sign-up
// POST request to '/SignUpAuthority' triggers the signUpAuthority function in the userController
router.post('/SignUpAuthority', userController.signUpAuthority);

// Exporting the router to be used in the main server file
module.exports = router;
