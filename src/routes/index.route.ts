import { Router } from 'express';
import logger from 'utils/winston';

class IndexRoute {
  public path = '/api/v1';
  public router = Router();

  constructor() {
    this.initializeRootRoutes();
    this.initializeMemoRoutes({
      path: `${this.path}/memo`,
    });
  }

  private initializeRootRoutes() {
    this.router.get('/', (req, res) => {
      logger.info('GET /', req);
      res.status(200).send('OK');
    });
  }

  private initializeMemoRoutes({ path }: { path: string }) {}
}

export default IndexRoute;
