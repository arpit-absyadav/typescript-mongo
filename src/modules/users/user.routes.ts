import { Router } from 'express';
import UsersController from './user.controller';
import { IRoute } from 'common/core/interfaces';
export class UserRoutes implements IRoute {
  public router = Router();
  path: '/users';
  private usersController = new UsersController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, this.usersController.addUser);
    this.router.get(`/count`, this.usersController.getUserListCount);
    this.router.get(`/`, this.usersController.getUserList);
    this.router.get(`/:userId`, this.usersController.getUser);
    // this.router.put(`/:userId`, this.usersController.updateUser);
    // this.router.delete(`/:userId`, this.usersController.deleteUser);
  }
}
