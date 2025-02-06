import { Router } from 'express';
import MemoController from '../controllers/memo.controller';

class AppRoute {
  // path and router have to be public so that they can be accessed from app.ts while new AppRoute() is called
  public path = '/api/v1';
  public router = Router();

  private memoController = new MemoController();

  constructor() {
    this.initializeMemoRoutes(`${this.path}/memo`);
  }

  private initializeMemoRoutes(path: string) {
    this.router.get(`${path}/all`, this.memoController.getAllMemo);
    this.router.get(`${path}/:id`, this.memoController.getMemo);
    this.router.post(`${path}/`, this.memoController.createMemo);
    this.router.put(`${path}/:id`, this.memoController.editMemo);
    this.router.delete(`${path}/:id`, this.memoController.softDeleteMemo);
  }
}

export default AppRoute;
