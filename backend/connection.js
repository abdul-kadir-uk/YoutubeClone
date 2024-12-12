import mongoose from 'mongoose';

async function Connection() {
  // get mongodb Uniform Resource Identifier from environment variables
  const uri = process.env.MONGODB_URI;
  try {
    // if mogodb uri not found
    if (!uri) {
      throw new Error('mongodb uri is missing');
    }
    // Connecting to MongoDB using Mongoose's connect method
    await mongoose.connect(uri);
    console.log('successfully connected to mongodb');
  } catch (error) {
    // handle error if occur 
    console.error('error while connecting to mongodb', error.message);
    // Exit the process if the connection fails
    process.exit(1);
  }
}

export default Connection;
