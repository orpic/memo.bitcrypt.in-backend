import { MongoClient, ServerApiVersion } from 'mongodb';
import { DATABASE_URI } from '@/env';
import logger from '@/utils/winston';

let client: MongoClient;

export const connectDB = async () => {
  if (!client) {
    logger.info('Connecting to MongoDB');
    client = new MongoClient(DATABASE_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    logger.info('Connected to MongoDB');
  }
  return client;
};

export const getDB = (dbName: string) => {
  if (!client) {
    throw new Error('MongoDB client is not initialized. Call connectDB() first.');
  }
  return client.db(dbName);
};

export const closeDB = async () => {
  if (client) {
    logger.info('Closing MongoDB connection');
    await client.close();
    logger.info('Closed MongoDB connection');
    return;
  }
  logger.warn('No active MongoDB connection to close');
};
