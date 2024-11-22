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
router.delete('/DeleteProblem/:id',ProblemController.DeleteProblem);



router.post('/createCompleteProblem',ProblemController.createCompleteProblem);
router.get('/getAllCompleteProblem',ProblemController.getAllCompleteProblem);
router.get('/getAllCompleteProblem/:location',ProblemController.getCompleteProblemLocation);
router.get('/getCompleteProblem/:email',ProblemController.getCompleteProblemEmail);
router.get('/getCompleteProblem/:location/:department',ProblemController.getCompleteProblemDepartment);
router.get('/getCompleteProblemDetail/:id',ProblemController.getCompleteProblemDetail);




// Exporting the router to be used in the main server file
module.exports = router;
