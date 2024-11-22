const Problem = require('../models/Problem'); // Import the Problem model

exports.createProblem = async (req, res) => {
    try {
        // Log the incoming request body and file
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { email, location, problemDetail, tags, publicCheck, authorityCheck } = req.body;

        // Validate required fields
        if (!(email && location && problemDetail && tags && publicCheck !== undefined && authorityCheck !== undefined)) {
            return res.status(400).send("All fields (Email, Location, Problem Detail, Tags, Public Check, and Authority Check) are required.");
        }

        // Handle image upload
        let imageUrl = req.file ? req.file.path : null;

        // Create the problem entry
        const problem = await Problem.create({
            email,
            location,
            imageUrl, // Save the image URL to the problem entry
            problemDetail,
            tags,
            publicCheck: JSON.parse(publicCheck), // Convert publicCheck to boolean if sent as a string
            authorityCheck: JSON.parse(authorityCheck) // Convert authorityCheck to boolean if sent as a string
        });

        // Respond with the created problem
        return res.status(201).json(problem);
    } catch (error) {
        console.error('Error creating problem entry:', error.message); // Log the error
        return res.status(500).send("Error creating problem entry.");
    }
};

exports.getAllProblem = async (req, res) => {
    try {
      // Fetch all problems from the database
      const problems = await Problem.find();
  
      // Return the list of problems
      res.status(200).json({
        success: true,
        message: 'Problems retrieved successfully',
        data: problems,
      });
    } catch (error) {
      console.error('Error fetching problems:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch problems',
        error: error.message,
      });
    }
  };