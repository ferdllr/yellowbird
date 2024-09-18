import mongoose from 'mongoose';

export const connect = async (databaseUrl: string): Promise<void> => {
  try {
    await mongoose.connect(databaseUrl);
    console.log('Database Connected');
  } catch (error) {
    console.error('Database Connection Error:', error);
    throw error;
  }
};