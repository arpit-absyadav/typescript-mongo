import { TOKEN_TYPE, auth } from './../../common/core/utils/jwt';
import { Router } from 'express';
import { TodoController } from './todo.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validators';
import { CreateTodoValidator, UpdateTodoValidator } from './validators';
import permit from '../../common/core/utils/permit';
import { ROLE } from '../users/user.enum';

export class TodoRoutes implements IRoute {
  public router = Router();
  path: '/todo';
  private todoController = new TodoController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({ validators: CreateTodoValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.todoController.addTodo,
    ]);

    this.router.get(`/count`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.todoController.getTodoListCount,
    ]);
    this.router.get(`/`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.todoController.getTodoList,
    ]);
    this.router.get(`/:todoId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'todoId',
      }),
      this.todoController.getTodo,
    ]);
    this.router.put(`/:todoId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'todoId',
      }),
      RequestValidator({
        validators: UpdateTodoValidator,
        type: VALIDATION_TYPE.REQ_BODY,
        skipMissingProperties: true,
      }),
      this.todoController.updateTodo,
    ]);
    this.router.delete(`/:todoId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'todoId',
      }),
      this.todoController.deleteTodo,
    ]);
  }
}
