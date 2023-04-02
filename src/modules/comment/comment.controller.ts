import { NextFunction, Request, Response } from 'express';
import { CommentService } from './comment.service';
import { error, success } from '../../common/core/handlers';
import { ICreateComment, IComment } from './interfaces/comment.interface';

export class CommentController {
  private commentService = new CommentService();

  public getCommentListCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const count = await this.commentService.getListCount({
        ...req.query,
      });
      return success.handler({ count }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getCommentList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const reqData = { ...req.query };

      if (reqData.ids) {
        reqData.ids = (reqData.ids as string).split(';');
      }
      const comments = await this.commentService.getList({
        ...reqData,
      });
      return success.handler({ comments }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public addComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const reqBody: ICreateComment = req.body;

      const comment: IComment = await this.commentService.createOne({
        ...reqBody,
      });

      return success.handler({ comment }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public getComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      console.log('req.params');
      console.log(req.params);

      const { commentId } = req.params;
      const comment = await this.commentService.getOne({
        id: commentId,
      });
      return success.handler({ comment }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { commentId } = req.params;
    const reqBody = req.body;
    try {
      await this.commentService.getOne({ id: commentId });
      const comment = await this.commentService.updateOne(commentId, reqBody);
      return success.handler({ comment }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

  public deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { commentId } = req.params;
    try {
      await this.commentService.getOne({ id: commentId });
      const comment = await this.commentService.deleteOne(commentId);

      return success.handler({ comment }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };
}
