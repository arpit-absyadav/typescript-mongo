import { UpdateUserValidator } from './validatiors/update-user.validation';
import { Router } from 'express';
import { UserController } from './user.controller';
import { IRoute } from '../../common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validators';
import { CreateUserValidator, SignInUserValidator } from './validatiors';
import permit from '../../common/core/utils/permit';
import { ROLE } from './user.enum';
import { TOKEN_TYPE, auth } from '../../common/core/utils/jwt';

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
      RequestValidator({ validators: SignInUserValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.userController.signIn,
    ]);

    this.router.get(`/count`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN]),
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.userController.getUserListCount,
    ]);
    this.router.get(`/`, [
    
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN]),
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.userController.getUserList,
    ]);
    this.router.get(`/:userId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'userId',
      }),
      this.userController.getUser,
    ]);
    this.router.put(`/:userId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'userId',
      }),
      RequestValidator({
        validators: UpdateUserValidator,
        type: VALIDATION_TYPE.REQ_BODY,
      }),
      this.userController.updateUser,
    ]);
    this.router.delete(`/:userId`, [
      auth(TOKEN_TYPE.ACCESS),
      permit([ROLE.ADMIN, ROLE.USER]),
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'userId',
      }),
      this.userController.deleteUser,
    ]);
  }
}
