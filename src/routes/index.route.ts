import { Router } from 'express';

class IndexRoute {
  public path = '/api/v1';
  public router = Router();

  constructor() {
    this.initializeRootRoutes({
      path: `${this.path}/root`,
    });
    this.initializeMemoRoutes({
      path: `${this.path}/memo`,
    });
  }

  private initializeRootRoutes({ path }: { path: string }) {
    this.router.get(path, (req, res) => {
      res.send('Hello World!');
    });
  }
  private initializeMemoRoutes({ path }: { path: string }) {}
}

export default IndexRoute;
