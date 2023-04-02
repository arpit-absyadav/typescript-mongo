import { Router } from 'express';
import { UserController } from './todo.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validatiors';
import { CreateUserValidator } from './validatiors';

export class UserRoutes implements IRoute {
  public router = Router();
  path: '/todo';
  private userController = new UserController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, [
      RequestValidator({ validators: CreateUserValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.userController.addUser,
    ]);

    this.router.get(`/count`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.userController.getUserListCount,
    ]);
    this.router.get(`/`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.userController.getUserList,
    ]);
    this.router.get(`/:todoId`, [
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'todoId',
      }),
      this.userController.getUser,
    ]);
    this.router.put(`/:todoId`, this.userController.updateUser);
    this.router.delete(`/:todoId`, this.userController.deleteUser);
  }
}
