// userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Transformer = require('../models/Transformer');
var postmark = require("postmark");

// Registration controller
const registerUser = async (req, res) => {
  try {
      const { fullname, role, password, email } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ fullname, role, password: hashedPassword, email });
      await newUser.save();

      // Send an email
      var client = new postmark.ServerClient("a1d20d26-ad4f-44f4-95cc-4fe0cac38584");

      client.sendEmail({
          "From": "fitsum@a2sv.org",
          "To": email,
          "Subject": "Registration Successful",
          "HtmlBody": `
              <html>
              <head>
                  <style>
                      .email-container {
                          font-family: Arial, sans-serif;
                          max-width: 600px;
                          margin: auto;
                          padding: 20px;
                          border: 1px solid #ddd;
                          border-radius: 10px;
                          background-color: #f9f9f9;
                      }
                      .email-header {
                          text-align: center;
                          background-color: #4CAF50;
                          color: white;
                          padding: 10px 0;
                          border-radius: 10px 10px 0 0;
                      }
                      .email-body {
                          padding: 20px;
                          text-align: left;
                      }
                      .email-footer {
                          text-align: center;
                          padding: 10px;
                          color: #777;
                          font-size: 12px;
                      }
                      .user-info {
                          background-color: #f2f2f2;
                          padding: 10px;
                          border-radius: 5px;
                          margin: 20px 0;
                      }
                      .user-info p {
                          margin: 5px 0;
                      }
                      .button-container {
                          text-align: center;
                          margin-top: 20px;
                      }
                      .login-button {
                          background-color: #4CAF50;
                          color: white;
                          padding: 10px 20px;
                          text-decoration: none;
                          border-radius: 5px;
                          display: inline-block;
                      }
                      .login-button:hover {
                          background-color: #45a049;
                      }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="email-header">
                          <h1>Welcome to Transformera!</h1>
                      </div>
                      <div class="email-body">
                          <p>Dear ${fullname},</p>
                          <p>Thank you for registering on our platform. Your registration was successful!</p>
                          <div class="user-info">
                              <p><strong>Username:</strong> ${email}</p>
                              <p><strong>Password:</strong> ${password}</p>
                          </div>
                          <p>We are excited to have you on board. If you have any questions or need assistance, please feel free to reach out to our support team.</p>
                          <div class="button-container">
                              <a href="https://transfomera.vercel.app/" class="login-button">Login to Your Account</a>
                          </div>
                          <p>Best regards,</p>
                          <p>The Team</p>
                      </div>
                      <div class="email-footer">
                          <p>© 2024 Our Platform. All rights reserved.</p>
                      </div>
                  </div>
              </body>
              </html>
          `,
          "TextBody": `Welcome to our platform, ${fullname}! Your registration was successful. Username: ${email}, Password: ${password}. Visit https://transfomera.vercel.app/ to login.`,
          "MessageStream": "transformera"
      });

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);
    const userDetail = await User.findById(user._id);

    res.status(200).json({ token, userDetail});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to authenticate' });
  }
};

const userDetail = async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await User.findById(userId);
    const registeredTransformers = await Transformer.find({ registeredBy: userId });

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    if (registeredTransformers.length === 0) {
      return res.status(404).send({ message: "You didn't register any transformers yet :(" });
    }

    res.status(200).json({ message: "Data retrieved successfully", userData, registeredTransformers });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// work on password reset
const passwordReset = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    // Retrieve user data by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'asc' } = req.query; // Default values for page, limit, and sort

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch the transformers with pagination and sorting
    const technicians = await User.find()
        .skip(skip)
        .limit(limitNumber);

    // Check if there are any transformers
    if (technicians.length === 0) {
        return res.status(404).json({ message: 'No technicans found' });
    }

    res.status(200).json(technicians);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

module.exports = { registerUser, loginUser, userDetail, passwordReset, getUsers};