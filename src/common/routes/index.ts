import { error } from '../../common/core/handlers';
import { Application, NextFunction, Request, Response } from 'express';
import { UserRoutes } from '../../modules/users/user.routes';
import { IndexRoutes } from './index.routes';

export class InitializeRoutes {
  private indexRoutes = new IndexRoutes();
  private userRoutes = new UserRoutes();

  public init(app: Application): any {
    app.use('/', [this.indexRoutes.router]);
    app.use('/users', [this.userRoutes.router]);

    // Setting up default 404 for missing routes.
    app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
      console.log('asdafadsf', err);
      return error.handler(err, req, res, next);
    });
  }
}
