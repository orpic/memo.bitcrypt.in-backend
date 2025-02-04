import winston from 'winston';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Function to format the timestamp in the IST timezone
const timezoned = () => {
  return format(toZonedTime(new Date(), 'Asia/Kolkata'), 'yyyy-MM-dd HH:mm:ss zzz');
};

// Reusable log format
const logFormat = winston.format.combine(
  winston.format.colorize(), // Adds color to logs for better visibility
  winston.format.timestamp({ format: timezoned }), // Custom timestamp with time zone
  winston.format.printf(
    ({ timestamp, level, message }) => `[${timestamp}] [${level}] ${message}`, // Custom log format
  ),
);

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Default level of logs
  format: logFormat, // Apply reusable format here
  transports: [
    new winston.transports.Console({ format: logFormat }), // Reuse the same format for Console
    new winston.transports.File({ filename: 'logs/server.log', format: logFormat }), // Reuse the same format for File
  ],
});

export default logger;
