import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import Routes from '@/types/routes';
import { PORT } from '@/env';

class App {
  public app: express.Application;
  public routes: Routes[];

  constructor(routes: Routes[]) {
    this.app = express();
    this.routes = routes;
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(hpp());
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(3000, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

export default App;
