import { Router } from 'express';
import { TodoController } from './todo.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validators';
import { CreateTodoValidator } from './validators';

export class TodoRoutes implements IRoute {
  public router = Router();
  path: '/todo';
  private todoController = new TodoController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, [
      RequestValidator({ validators: CreateTodoValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.todoController.addTodo,
    ]);

    this.router.get(`/count`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.todoController.getTodoListCount,
    ]);
    this.router.get(`/`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.todoController.getTodoList,
    ]);
    this.router.get(`/:todoId`, [
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'todoId',
      }),
      this.todoController.getTodo,
    ]);
    this.router.put(`/:todoId`, this.todoController.updateTodo);
    this.router.delete(`/:todoId`, this.todoController.deleteTodo);
  }
}
