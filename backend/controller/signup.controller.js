import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

const signup_controller = async (req, res) => {
  try {
    // get user data 
    const { name, email, password, categories } = req.body;
    if (!name || !email || !password || !categories) {
      return res.status(400).json({
        message: "name, email, password and categories are required"
      });
    }
    // check user exist
    const existUser = await User.findOne({ email });
    // if user found
    if (existUser) {
      return res.status(400).json({
        message: "user already exist, use another email"
      })
    }
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the user's password using bcrypt
    const hashPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      categories
    })
    // Save the new user to the database
    await newUser.save();
    // when user successfully created
    return res.status(201).json({
      message: "user created successfully"
    })

  } catch (error) {
    // handle errors 
    res.status(500).json({
      message: error.message
    })
  }
}

export default signup_controller;