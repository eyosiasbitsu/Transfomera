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

      // Send an email:
      var client = new postmark.ServerClient("a1d20d26-ad4f-44f4-95cc-4fe0cac38584");

      client.sendEmail({
        "From": "fitsum@a2sv.org",
        "To": email,
        "Subject": "Registration Successful",
        "HtmlBody": "<strong>Welcome to our platform! You have successfully registered.</strong>",
        "TextBody": "Welcome to our platform!",
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

module.exports = { registerUser, loginUser, userDetail, passwordReset };