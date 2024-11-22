// Importing required modules
const express = require('express');  // Express framework
const router = express.Router();     // Router to define routes
const upload = require('../middleware/multer.js');
const ProblemController = require('../Controllers/ProblemController.js');

router.post('/createProblem',upload.single('image'),ProblemController.createProblem);

// Exporting the router to be used in the main server file
module.exports = router;
