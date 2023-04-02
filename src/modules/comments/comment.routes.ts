import { Router } from 'express';
import { UserController } from './comment.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validatiors';
import { CreateUserValidator } from './validatiors';

export class UserRoutes implements IRoute {
  public router = Router();
  path: '/users';
  private userController = new UserController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/signup`, [
      RequestValidator({ validators: CreateUserValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.userController.addUser,
    ]);
    this.router.post(`/signin`, [
      RequestValidator({ validators: CreateUserValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.userController.signIn,
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
    this.router.get(`/:userId`, [
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'userId',
      }),
      this.userController.getUser,
    ]);
    this.router.put(`/:userId`, this.userController.updateUser);
    this.router.delete(`/:userId`, this.userController.deleteUser);
  }
}
