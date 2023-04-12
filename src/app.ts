import * as express from 'express';
import { InitializeRoutes } from './common/routes/index';
import { MongooseManager } from './common/managers/mongoose.manager';
import { error, success } from './common/core/handlers';
import { IRoute } from './common/core/interfaces';

export class App {
  public app: express.Application;
  private apiRoutes: express.Router;
  private routes: IRoute[] | any;

  /**
   * Adding all routes.
   * Initializing Database connection
   */
  private mongooseManager = new MongooseManager();
  private initializeRoutes = new InitializeRoutes();

  /**
   * Constructor will set required values and initialize middleware and routes.
   */
  constructor() {
    this.app = express();
    this.apiRoutes = express.Router();

    /**
     * Initializing Middlewares, Managers and Routes
     */
    this.initManagers();
    this.initMiddlewares();
    this.initRoutes();
  }

  public getServer(): express.Application {
    return this.app;
  }

  private async initManagers() {
    console.log('ssssss');
    
    await this.mongooseManager.init();
    this.mongooseManager.getInstance()
  }

  private initRoutes() {
    this.routes = this.initializeRoutes.init(this.app);
  }

  private initMiddlewares() {
    this.app.use(express.json() as express.RequestHandler);
    this.app.use(express.urlencoded({ extended: true }) as express.RequestHandler);

    // Setting up error handler middleware
    this.app.use(error.handler);
    this.app.use(success.handler);
  }
}

export default new App().app;
