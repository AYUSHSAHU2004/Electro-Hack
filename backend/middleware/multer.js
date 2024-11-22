// Load environment variables from .env file
require("dotenv").config();

// Import the required modules
const multer = require("multer"); // Middleware for handling file uploads
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Storage engine for Cloudinary
const cloudinary = require("cloudinary").v2; // Cloudinary SDK

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// Configure the storage options for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Link the Cloudinary instance
  params: {
    folder: "products", // Folder name in Cloudinary to store the uploaded files
    allowed_formats: ["jpg", "png", "jpeg"], // Restrict uploads to specific formats
    filename: (req, file) => {
      // Generate a unique filename using the current timestamp and the original file name
      return Date.now() + "-" + file.originalname;
    },
  },
});

// Initialize the multer upload middleware with Cloudinary storage
const upload = multer({ storage: storage });

// Export the upload middleware to use in other parts of the application
module.exports = upload;
