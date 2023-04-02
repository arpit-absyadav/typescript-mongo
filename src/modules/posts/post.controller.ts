import { NextFunction, Request, Response } from 'express';
import { error, success } from '../../common/core/handlers';
import { ICreatePost, IPost } from './interfaces/post.interface';
import { PostService } from './post.service';

export class PostController {
  private postService = new PostService();

  public getPostListCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const count = await this.postService.getListCount({
        ...req.query,
      });
      return success.handler({ count }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getPostList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const reqData = { ...req.query };

      if (reqData.ids) {
        reqData.ids = (reqData.ids as string).split(';');
      }
      const posts = await this.postService.getList({
        ...reqData,
      });
      return success.handler({ posts }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public addPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const reqBody: ICreatePost = req.body;

      const post: IPost = await this.postService.createOne({
        ...reqBody,
      });

      return success.handler({ post }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      console.log('req.params');
      console.log(req.params);

      const { postId } = req.params;
      const post = await this.postService.getOne({
        id: postId,
      });
      return success.handler({ post }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { postId } = req.params;
    const reqBody = req.body;
    try {
      await this.postService.getOne({ id: postId });
      const post = await this.postService.updateOne(postId, reqBody);
      return success.handler({ post }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { postId } = req.params;
    try {
      await this.postService.getOne({ id: postId });
      const post = await this.postService.deleteOne(postId);

      return success.handler({ post }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };
}
