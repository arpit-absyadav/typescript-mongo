import { Router } from 'express';
import { CommentController } from './comment.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validators';
import { CreateCommentValidator } from './validatiors';

export class CommentRoutes implements IRoute {
  public router = Router();
  path: '/comments';
  private commentController = new CommentController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, [
      RequestValidator({ validators: CreateCommentValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.commentController.addComment,
    ]);

    this.router.get(`/count`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.commentController.getCommentListCount,
    ]);
    this.router.get(`/`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.commentController.getCommentList,
    ]);
    this.router.get(`/:commentId`, [
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'commentId',
      }),
      this.commentController.getComment,
    ]);
    this.router.put(`/:commentId`, this.commentController.updateComment);
    this.router.delete(`/:commentId`, this.commentController.deleteComment);
  }
}
