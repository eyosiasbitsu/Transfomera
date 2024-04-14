// userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to authenticate' });
  }
};
module.exports = { registerUser, loginUser };