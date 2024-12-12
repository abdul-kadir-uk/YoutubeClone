import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signin_controller = async (req, res) => {
  try {
    // get email password from user 
    const { email, password } = req.body;
    // validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // find user by email 
    const user = await User.findOne({ email });
    // if user not found
    if (!user) {
      return res.status(404).json({
        message: "account not found"
      })
    }
    // Compare the provided password with the hashed password stored in the database
    const ismatch = await bcrypt.compare(password, user.password);
    // if password not matched
    if (!ismatch) {
      return res.status(401).json({
        message: "incorrect password"
      })
    }
    // Generate a JWT token with user id and a secret key
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "10h" })
    return res.status(200).json({ token });

  } catch (error) {
    // handle errors 
    return res.status(500).json({
      message: error.message
    })
  }
}

export default signin_controller;

