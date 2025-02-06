import 'dotenv/config';
import App from './app';
import AppRoute from './routes/app.route';
import { closeDB, connectDB } from './database';
import logger from './utils/winston';

(async () => {
  try {
    await connectDB();
    const app = new App([new AppRoute()]);
    app.listen();

    // Handle graceful shutdown
    const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    let isShuttingDown = false;

    for (const signal of signals) {
      process.on(signal, async () => {
        if (isShuttingDown) return;
        isShuttingDown = true;
        await closeDB();
        process.exit(0);
      });
    }
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
})();
