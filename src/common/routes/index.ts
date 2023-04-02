import { error } from '../../common/core/handlers';
import { Application, NextFunction, Request, Response } from 'express';
import { UserRoutes } from '../../modules/users/user.routes';
import { TodoRoutes } from './../../modules/todos/todo.routes';
import { PostRoutes } from './../../modules/posts/post.routes';
import { CommentRoutes } from './../../modules/comment/comment.routes';
import { IndexRoutes } from './index.routes';

export class InitializeRoutes {
  private indexRoutes = new IndexRoutes();
  private userRoutes = new UserRoutes();
  private todoRoutes = new TodoRoutes();
  private postRoutes = new PostRoutes();
  private commentRoutes = new CommentRoutes();

  public init(app: Application): any {
    app.use('/', [this.indexRoutes.router]);
    app.use('/users', [this.userRoutes.router]);
    app.use('/todo', [this.todoRoutes.router]);
    app.use('/posts', [this.postRoutes.router]);
    app.use('/comments', [this.commentRoutes.router]);

    // Setting up default 404 for missing routes.
    app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
      return error.handler(err, req, res, next);
    });
  }
}
