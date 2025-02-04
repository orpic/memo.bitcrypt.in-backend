import dotenv from 'dotenv';
import { DEVELOPMENT, PRODUCTION } from './constants/common';

// Get the current environment (defaults to development if not set)
const environment = process.env.NODE_ENV || DEVELOPMENT;

// Load the appropriate `.env` file based on the environment
const envFile = `.env.${environment}`;

// Load environment variables from the selected .env file
dotenv.config({ path: envFile });

// Export the variables for use in your app
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is missing in ${envFile}`);
  }
  return value;
}

export const isProduction: boolean = environment === PRODUCTION;
export const isDevelopment: boolean = environment === DEVELOPMENT;
export const PORT: number = parseInt(getEnvVariable('PORT'), 10);
export const NODE_ENV: string = getEnvVariable('NODE_ENV');
export const DATABASE_URI: string = getEnvVariable('DATABASE_URI');
