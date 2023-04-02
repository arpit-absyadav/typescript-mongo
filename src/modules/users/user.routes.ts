import { Router } from 'express';
import { UserController } from './user.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { ListValidator } from '../../common/validatiors';
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
      RequestValidator(CreateUserValidator, VALIDATION_TYPE.REQ_BODY),
      this.userController.addUser,
    ]);
    this.router.post(`/signin`, [
      RequestValidator(CreateUserValidator, VALIDATION_TYPE.REQ_BODY),
      this.userController.addUser,
    ]);

    this.router.get(`/count`, this.userController.getUserListCount);
    this.router.get(`/`, [
      RequestValidator(ListValidator, VALIDATION_TYPE.REQ_QUERY, true),
      this.userController.getUserList,
    ]);
    this.router.get(`/:userId`, this.userController.getUser);
    // this.router.put(`/:userId`, this.userController.updateUser);
    // this.router.delete(`/:userId`, this.userController.deleteUser);
  }
}
