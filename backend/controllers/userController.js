// userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Your SMTP host
  port: 465, // Your SMTP port
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'eyosiasbitsu@gmail.com', // Your email address
    pass: 'Fitsa394685368521+', // Your email password
  },
});


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

      // Send email to the registered user
      await transporter.sendMail({
        from: 'eyosiasbitsu@gmail.com',
        to: email,
        subject: 'Registration Successful',
        html: `
          <h1>Welcome to our platform!</h1>
          <p>You have successfully registered.</p>
          <p>Your login credentials are:</p>
          <p>Email: ${email}</p>
          <p>Password: ${password}</p>
          <p>Please <a href="https://www.youtube.com/watch?v=zodHltkgK1w&ab_channel=PlayingEpicd">click here</a> to login</p>
        `,
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user' });
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
