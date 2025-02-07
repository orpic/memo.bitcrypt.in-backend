import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import Routes from './types/routes';
import { PORT } from './env';
import logger from './utils/winston';

class App {
  public app: express.Application;
  public port: string | number;
  readonly routes: Routes[];

  constructor(routes: Routes[]) {
    this.port = PORT;
    this.routes = routes;
    this.app = express();
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(hpp());
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      if (!route.router) {
        console.error(`❌ Error: Router is undefined for ${route.path}`);
      }
      this.app.use(route.path, route.router);
    });
  }

  private initializeErrorHandling() {
    // 404 handler
    this.app.use((req, res, next) => {
      console.log(`Route not found: ${req.method} ${req.url}`);
      res.status(404).send('API not found');
    });

    // General error handler
    this.app.use((req, res, next) => {
      console.error(`Error occurred on ${req.method} ${req.url}`);
      res.status(500).send('Internal Server Error');
    });
  }

  public listen() {
    this.app.listen(this.port, (e) => {
      if (e) {
        logger.error(`Error starting the server: ${e}`);
        process.exit(1);
      }
      logger.info(`Server running on http://localhost:${this.port}`);
    });
  }
}

export default App;
