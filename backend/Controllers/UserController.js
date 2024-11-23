const Public = require("../model/Public");
const Authority = require("../model/Authority");

exports.signUpPublic = async (req, res) => {
  // Extracting the email and phoneNumber from the request body
  const { email, phoneNumber } = req.body;

  try {
    // Checking if the email already exists in the database
    const existingUser = await Public.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Creating a new Public user instance
    const newUser = new Public({
      email,
      phoneNumber,
    });

    // Saving the new user to the database
    await newUser.save();

    // Sending a success response with the created user's details
    return res.status(201).json({
      message: "User created successfully!",
      user: {
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    // Handling any errors during the process
    console.error("Error during user creation:", error);
    return res
      .status(500)
      .json({ message: "Failed to create user. Please try again." });
  }
};

exports.checkPublic = async (req, res) => {
  const { email } = req.params; // Get email from params

  try {
    // Search the Public collection for the email
    const user = await Public.findOne({ email });

    if (user) {
      // If email exists in the Public collection
      return res
        .status(200)
        .send({ message: "Email exists in the Public database" });
    } else {
      // If email does not exist
      return res
        .status(404)
        .send({ message: "Email not found in Public database" });
    }
  } catch (error) {
    console.error("Error checking email in Public database:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.checkAuth = async (req, res) => {
  const { email } = req.params; // Get email from params

  try {
    // Search the Public collection for the email
    const user = await Authority.findOne({ email });

    if (user) {
      // If email exists in the Public collection
      return res.status(200).send(user);
    } else {
      // If email does not exist
      return res
        .status(404)
        .send({ message: "Email not found in Authority database" });
    }
  } catch (error) {
    console.error("Error checking email in Authority database:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.signUpAuthority = async (req, res) => {
  // Extracting necessary data from the request body
  const { email, phoneNumber, Location, Department } = req.body;

  try {
    // Checking if the email or phone number already exists in the database
    const existingUser = await Authority.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Phone number already exists" });
    }

    // Creating a new Authority user instance
    const newUser = new Authority({
      email,
      phoneNumber,
      Location,
      Department,
    });

    // Saving the new user to the database
    await newUser.save();

    // Sending a success response with the created user's details
    return res.status(201).json({
      message: "Authority user created successfully!",
      user: {
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        Location: newUser.Location,
        Department: newUser.Department,
      },
    });
  } catch (error) {
    // Handling any errors during the process
    console.error("Error during user creation:", error);
    return res
      .status(500)
      .json({ message: "Failed to create Authority user. Please try again." });
  }
};
