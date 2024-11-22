const Problem = require('../model/Problem'); // Import the Problem model

const CompleteProblem = require('../model/CompleteProblem'); // Import the model

exports.createCompleteProblem = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { email, location, imageUrl, problemDetail, tags } = req.body;

        // Validate required fields
        if (!(email && location && imageUrl && problemDetail && tags)) {
            return res.status(400).json({ message: "All fields (email, location, imageUrl, problemDetail, tags) are required." });
        }

        // Create a new CompleteProblem document
        const newProblem = await CompleteProblem.create({
            email,
            location,
            imageUrl,
            problemDetail,
            tags,
            // publicCheck and authorityCheck will default to true
        });

        // Respond with the created problem
        return res.status(201).json({ message: 'CompleteProblem created successfully', newProblem });
    } catch (err) {
        console.error('Error creating CompleteProblem:', err.message); // Log the error
        return res.status(500).json({ message: 'Error creating CompleteProblem', error: err.message });
    }
};


exports.DeleteProblem = async (req, res) => {
  try {
      const { id } = req.params; // Extract the problem ID from the request parameters

      // Attempt to find and delete the problem by its ID
      const deletedProblem = await Problem.findByIdAndDelete(id);

      // Check if the problem existed and was deleted
      if (!deletedProblem) {
          return res.status(404).json({ message: 'Problem not found' });
      }

      // Return a success message
      return res.status(200).json({ message: 'Problem deleted successfully', deletedProblem });
  } catch (error) {
      console.error('Error deleting problem:', error.message); // Log any error
      return res.status(500).json({ message: 'Error deleting problem' });
  }
};


exports.createProblem = async (req, res) => {
    try {
        // Log the incoming request body and file for debugging
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { email, location, problemDetail, tags, publicCheck, authorityCheck } = req.body;

        // Validate required fields
        if (!(email && location && problemDetail && tags && publicCheck !== undefined && authorityCheck !== undefined)) {
            return res.status(400).send("All fields (Email, Location, Problem Detail, Tags, Public Check, and Authority Check) are required.");
        }

        // Parse the boolean fields safely
        let parsedPublicCheck, parsedAuthorityCheck;
        try {
            parsedPublicCheck = JSON.parse(publicCheck);
            parsedAuthorityCheck = JSON.parse(authorityCheck);
        } catch (error) {
            return res.status(400).send("PublicCheck and AuthorityCheck must be valid booleans.");
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
            publicCheck: parsedPublicCheck, // Use parsed boolean values
            authorityCheck: parsedAuthorityCheck // Use parsed boolean values
        });

        // Respond with the created problem
        return res.status(201).json(problem);
    } catch (error) {
        console.error('Error creating problem entry:', error); // Log the full error message for debugging
        return res.status(500).send("Error creating problem entry.");
    }
};

exports.getAllCompleteProblem = async(req,res) =>{
  try {
    // Fetch all problems from the database
    const problems = await CompleteProblem.find();

    // Return the list of problems
    res.status(200).json({
      success: true,
      message: 'CompleteProblems retrieved successfully',
      data: problems,
    });
  } catch (error) {
    console.error('Error fetching CompleteProblems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Completeproblems',
      error: error.message,
    });
  }
}

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


exports.getCompleteProblemLocation = async(req,res) => {
    try {
      // Extract location from request parameters
      const { location } = req.params;

      // Validate that location is provided
      if (!location) {
          return res.status(400).send("Location parameter is required.");
      }

      // Find all problems matching the provided location
      const problems = await CompleteProblem.find({ location });

      // If no problems are found, return a 404 response
      if (problems.length === 0) {
          return res.status(404).send("No CompleteProblems found for the given location.");
      }

      // Return the problems found
      return res.status(200).json(problems);
  } catch (error) {
      console.error('Error fetching CompleteProblems by location:', error.message); // Log the error
      return res.status(500).send("Error fetching problems.");
  }
  }


exports.getProblemLoc = async (req, res) => {
    try {
        // Extract location from request parameters
        const { location } = req.params;

        // Validate that location is provided
        if (!location) {
            return res.status(400).send("Location parameter is required.");
        }

        // Find all problems matching the provided location
        const problems = await Problem.find({ location });

        // If no problems are found, return a 404 response
        if (problems.length === 0) {
            return res.status(404).send("No problems found for the given location.");
        }

        // Return the problems found
        return res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems by location:', error.message); // Log the error
        return res.status(500).send("Error fetching problems.");
    }
};

exports.getCompleteProblemEmail = async(req,res) =>{
  try {
    // Extract email from request parameters
    const { email } = req.params;

    // Validate that email is provided
    if (!email) {
        return res.status(400).send("Email parameter is required.");
    }

    // Find all problems matching the provided email
    const problems = await CompleteProblem.find({ email });

    // If no problems are found, return a 404 response
    if (problems.length === 0) {
        return res.status(404).send("No CompleteProblem found for the given email.");
    }

    // Return the problems found
    return res.status(200).json(problems);
} catch (error) {
    console.error('Error fetching CompleteProblem by email:', error.message); // Log the error
    return res.status(500).send("Error fetching problems.");
}
}
exports.getProblemEmail = async (req, res) => {
    try {
        // Extract email from request parameters
        const { email } = req.params;

        // Validate that email is provided
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        // Find all problems matching the provided email
        const problems = await Problem.find({ email });

        // If no problems are found, return a 404 response
        if (problems.length === 0) {
            return res.status(404).send("No problems found for the given email.");
        }

        // Return the problems found
        return res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems by email:', error.message); // Log the error
        return res.status(500).send("Error fetching problems.");
    }
};

exports.getCompleteProblemDepartment = async(req,res) =>{
  const { location, department } = req.params;  // Extract location and department from URL params
  
  try {
    // Fetch problems based on both location and department
    const problems = await CompleteProblem.find({
      location: location, 
      tags: department
    });

    // Check if any problems were found
    if (problems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No CompleteProblem found for this location and department',
      });
    }

    // Return the problems
    res.status(200).json({
      success: true,
      message: 'CompleteProblem retrieved successfully',
      data: problems,
    });
  } catch (error) {
    console.error('Error fetching CompleteProblem:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message,
    });
  }
}
exports.getProblemDepartment = async (req, res) => {
    const { location, department } = req.params;  // Extract location and department from URL params
  
    try {
      // Fetch problems based on both location and department
      const problems = await Problem.find({
        location: location, 
        tags: department
      });
  
      // Check if any problems were found
      if (problems.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No problems found for this location and department',
        });
      }
  
      // Return the problems
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

  exports.updateProblem = async (req, res) => {
    try {
        // Log the incoming request body and file
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { email, location, problemDetail, tags, publicCheck, authorityCheck } = req.body;
        const { id } = req.body; // Extract the ID from request parameters
        
        // Find the existing problem by its ID
        const problem = await Problem.findById(id);

        // Validate required fields
        if (!(email && location && problemDetail && tags !== undefined && publicCheck !== undefined && authorityCheck !== undefined)) {
            return res.status(400).send("All fields (Email, Location, Problem Detail, Tags, Public Check, and Authority Check) are required.");
        }
        
        // Check if the problem exists
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Prepare the update data
        let imageUrl = req.file ? req.file.path : problem.imageUrl; // Use the uploaded image if available, else retain the existing one

        // Update the problem entry
        problem.email = email;
        problem.location = location;
        problem.problemDetail = problemDetail;
        problem.tags = tags;
        problem.publicCheck = publicCheck;
        problem.authorityCheck = authorityCheck;
        problem.imageUrl = imageUrl; // Save the image URL if provided

        // Save the updated problem
        await problem.save();

        // Respond with the updated problem data
        return res.status(200).json(problem);
    } catch (error) {
        console.error('Error updating problem entry:', error.message); // Log the error message
        return res.status(500).send("Error updating problem entry.");
    }
};

exports.getProblemDetail = async (req, res) => {
  try {
      const { id } = req.params; // Extract the problem ID from the request parameters

      // Fetch the problem from the database using the ID
      const problem = await Problem.findById(id);

      // Check if the problem exists
      if (!problem) {
          return res.status(404).json({ message: 'Problem not found' });
      }

      // Return the fetched problem details
      return res.status(200).json(problem);
  } catch (error) {
      console.error('Error fetching problem details:', error.message); // Log any error
      return res.status(500).json({ message: 'Error fetching problem details' });
  }
};
