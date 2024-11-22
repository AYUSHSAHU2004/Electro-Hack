// Importing required modules
const express = require('express');  // Express framework
const router = express.Router();     // Router to define routes
const upload = require('../middleware/multer.js');
const ProblemController = require('../Controllers/ProblemController.js');

router.post('/createProblem',upload.single('imageUrl'),ProblemController.createProblem);
router.get('/getAllProblem',ProblemController.getAllProblem);
router.get('/getAllProblem/:location',ProblemController.getProblemLoc);
router.get('/getProblem/:email',ProblemController.getProblemEmail);
router.get('/getProblem/:location/:department',ProblemController.getProblemDepartment);
router.get('/getProblemDetail/:id',ProblemController.getProblemDetail);
router.post('/updateProblem',upload.single('imageUrl'),ProblemController.updateProblem);
router.delete('DeleteProblem/:id',ProblemController.DeleteProblem);

// Exporting the router to be used in the main server file
module.exports = router;
