import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { error, success } from '../../common/core/handlers';

export default class UsersController {
  private userService = new UserService();

  public getUserListCount = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const count = await this.userService.getListCount({
        ...req.query,
      });
      return success.handler({ count }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getUserList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const reqData = { ...req.query };
      if (reqData.ids) {
        reqData.ids = (reqData.ids as string).split(';');
      }
      const validatedReqData = reqData;
      const users = await this.userService.getList({
        ...validatedReqData,
      });
      return success.handler({ users }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const reqBody = req.body;
      console.log(reqBody);
      const validatedReqData = reqBody;
      console.log('validatedReqData', validatedReqData);

      const user = await this.userService.createOne({
        ...validatedReqData,
      });
      return success.handler({ user }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { userId } = req.params;
      const user = await this.userService.getOne({
        id: +userId,
        user_id: 1,
      });
      return success.handler({ user }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  // public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  //   const { userId } = req.params;
  //   const { enable } = req.query;
  //   const reqBody = req.body;
  //   try {
  //     const id = await idValidation.validateAsync(userId);
  //     const validatedReqData = await updateUserValidation.validateAsync({
  //       ...reqBody,
  //       enable,
  //     });
  //     const user = await this.userService.updateOne({
  //       user_id: req.user.id,
  //       id,
  //       ...validatedReqData,
  //     });
  //     return success.handler({ user }, req, res, next);
  //   } catch (err) {
  //     return error.handler(err, req, res, next);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  //   const { userId } = req.params;
  //   try {
  //     const id = await idValidation.validateAsync(userId);
  //     const user = await this.userService.deleteOne({
  //       id,
  //       user_id: req.user.id,
  //     });
  //     return success.handler({ user }, req, res, next);
  //   } catch (err) {
  //     return error.handler(err, req, res, next);
  //   }
  // };
}
