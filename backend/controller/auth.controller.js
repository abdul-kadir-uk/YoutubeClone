import jwt from 'jsonwebtoken';

// Middleware function for authentication
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the 'Authorization' header 
    const authorization = req.headers['authorization'];

    // Check if the 'Authorization' header exists and starts with 'Bearer '
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token or token is missing" });
    }

    // Extract the token from the 'Authorization' header 
    const token = authorization.split(" ")[1];

    // Retrieve the secret key from environment variables
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("Secret key is missing");
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the user's ID 
    req.user = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors 
    res.status(401).json({
      message: `Unauthorized: ${error.message}`,
    });
  }
};

export default authMiddleware;
