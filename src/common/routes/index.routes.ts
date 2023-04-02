import { success } from '../../common/core/handlers';
import { IRoute } from '../../common/core/interfaces';
import { Router, Response, Request, NextFunction } from 'express';

export class IndexRoutes implements IRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.init();
  }

  public init(): Router {
    this.router.get(`${this.path}`, (req: Request, res: Response, next: NextFunction) => success.handler({ message: 'Welcome' }, req, res, next));
    return this.router;
  }
}
