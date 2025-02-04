import dotenv from "dotenv";

// Get the current environment (defaults to development if not set)
const environment = process.env.NODE_ENV || "development";

// Load the appropriate `.env` file based on the environment
const envFile =
  environment === "production" ? ".env.production" : ".env.development";

// Load environment variables from the selected .env file
dotenv.config({ path: envFile });

// Export the variables for use in your app
export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const NODE_ENV: string = process.env.NODE_ENV || "development";
