import { ERROR } from './../../common/core/handlers/consts/error';
import { HttpException } from './../../common/core/handlers/error/HttpException';
import { STATUS } from './../../consts/status';
import { TOKEN_TYPE } from './../../common/core/utils/jwt';
import { config } from './../../config/index';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { error, success } from '../../common/core/handlers';
import { ITokenPayload } from '../../common/core/utils/jwt';
import { JWT } from '../../common/core/utils';
import { ICreateUser, IUser } from './interfaces/user.interface';

export class UserController {
  private userService = new UserService();

  public getUserListCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const count = await this.userService.getListCount({
        ...req.query,
      });
      return success.handler({ count }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getUserList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const reqData = { ...req.query };

      if (reqData.ids) {
        reqData.ids = (reqData.ids as string).split(';');
      }
      const users = await this.userService.getList({
        ...reqData,
      });
      return success.handler({ users }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  hashPassword = async ({ password }: { password: string }): Promise<any> => {
    const salt = await bcrypt.genSaltSync(+config.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  };

  public addUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    console.log('Controller start');
    
    try {
      const reqBody: ICreateUser = req.body;

      const hashAndSalt = await this.hashPassword({
        password: reqBody.password,
      });

      const payload: ITokenPayload = {
        email: reqBody.email,
        role: reqBody.role,
      };

      console.log('asdfadfadsfadsf');
      
      const refreshToken: string = await JWT.signToken(payload, TOKEN_TYPE.REFRESH);

      const user: IUser = await this.userService.createOne({
        ...reqBody,
        ...hashAndSalt,
        refresh_token: refreshToken,
      });
      const accessToken: string = await JWT.signToken(payload, TOKEN_TYPE.ACCESS);

      delete user.salt;
      delete user.hash;
      delete user.refresh_token;

      console.log('After db call');
      
      return success.handler(
        { user, access_token: accessToken, refresh_token: refreshToken },
        req,
        res,
        next,
      );
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  private comparePassword = async (password: string, user: IUser) => {
    const verified = await bcrypt.compare(password, user.hash);
    if (!verified) {
      throw new HttpException(ERROR.FORBIDDEN, 'Invalid Credentials');
    }
    return true;
  };
  private processSignIn = async ({ password, user }: any) => {
    if (user.status !== STATUS.ENABLED) {
      throw new HttpException(ERROR.FORBIDDEN, 'User not acctive.');
    }
    await this.comparePassword(password, user);
  };

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user: IUser = await this.userService.getByEmail({
        email,
      });

      await this.processSignIn({ password, user });

      const payload: ITokenPayload = {
        email,
        role: user.role,
      };

      const refreshToken: string = await JWT.signToken(payload, TOKEN_TYPE.REFRESH);

      // update the refresh token
      await this.userService.updateOne(user._id, { refresh_toke: refreshToken });

      const accessToken: string = await JWT.signToken(payload, TOKEN_TYPE.ACCESS);

      const userData = await this.userService.getOne({ id: user._id });
      return success.handler(
        { user: userData, access_token: accessToken, refresh_token: refreshToken },
        req,
        res,
        next,
      );
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };
  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      console.log('req.params');
      console.log(req.params);

      const { userId } = req.params;
      const user = await this.userService.getOne({
        id: userId,
      });
      return success.handler({ user }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { userId } = req.params;
    const reqBody = req.body;
    try {
      await this.userService.getOne({ id: userId });
      const user = await this.userService.updateOne(userId, reqBody);
      return success.handler({ user }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { userId } = req.params;
    try {
      await this.userService.getOne({ id: userId });
      const user = await this.userService.deleteOne(userId);

      return success.handler({ user }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };
}
