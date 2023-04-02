import { NextFunction, Request, Response } from 'express';
import { TodoService } from './todo.service';
import { error, success } from '../../common/core/handlers';
import { ICreateTodo, ITodo } from './interfaces/todo.interface';

export class TodoController {
  private todoService = new TodoService();

  public getTodoListCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const count = await this.todoService.getListCount({
        ...req.query,
      });
      return success.handler({ count }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getTodoList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const reqData = { ...req.query };

      if (reqData.ids) {
        reqData.ids = (reqData.ids as string).split(';');
      }
      const todos = await this.todoService.getList({
        ...reqData,
      });
      return success.handler({ todos }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public addTodo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const reqBody: ICreateTodo = req.body;

      const todo: ITodo = await this.todoService.createOne({
        ...reqBody,
      });

      return success.handler({ todo }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getTodo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      console.log('req.params');
      console.log(req.params);

      const { todoId } = req.params;
      const todo = await this.todoService.getOne({
        id: todoId,
      });
      return success.handler({ todo }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { todoId } = req.params;
    const reqBody = req.body;
    try {
      await this.todoService.getOne({ id: todoId });
      const todo = await this.todoService.updateOne(todoId, reqBody);
      return success.handler({ todo }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { todoId } = req.params;
    try {
      await this.todoService.getOne({ id: todoId });
      const todo = await this.todoService.deleteOne(todoId);

      return success.handler({ todo }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };
}
