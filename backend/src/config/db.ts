// Connect to Database
import mongoose from 'mongoose';
import pc from 'picocolors';
import { env } from './env';

const connectDB = async () => {
  try {
    const mongoDBConnect = await mongoose.connect(env.MONGO_URI);
    console.info(pc.green(`> MongoDB Connected to: ${mongoDBConnect.connection.host}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
