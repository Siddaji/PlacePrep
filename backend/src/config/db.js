import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn(
      "[Database] MONGODB_URI environment variable is not defined in environment variables."
    );
  }

  const uriToUse = mongoURI || "mongodb://127.0.0.1:27017/placeprep";

  try {
    const conn = await mongoose.connect(uriToUse, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] MongoDB Connection Note: ${error.message}`);
    console.warn(
      "[Database] Could not establish connection to " + uriToUse + ".\n" +
      "[Database] Non-database routes will continue to function normally.\n" +
      "[Database] To enable auth & database features, supply MONGODB_URI in your environment settings (e.g., MongoDB Atlas connection string)."
    );
  }
};

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

