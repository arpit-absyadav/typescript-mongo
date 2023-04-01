import { Application } from 'express';
import { UserRoutes } from '../../modules/users/user.routes';
import { IndexRoutes } from './index.routes';
import { error } from '@abslibs/core/dist/handlers';

export class InitializeRoutes {
  private indexRoutes = new IndexRoutes();
  private userRoutes = new UserRoutes();

  public init(app: Application): any {
    app.use('/', [this.indexRoutes.router]);
    app.use('/users', [this.userRoutes.router]);

    // Setting up default 404 for missing routes.
    app.use('*', (req, res) => {
      return error.routeNotFound('', res);
    });
  }
}
