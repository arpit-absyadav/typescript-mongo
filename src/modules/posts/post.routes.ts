import { Router } from 'express';
import { PostController } from './post.controller';
import { IRoute } from 'common/core/interfaces';
import {
  RequestValidator,
  VALIDATION_TYPE,
} from '../../common/core/middlewares/validation.middleware';
import { IdValidator, ListValidator } from '../../common/validators';
import { CreatePostValidator } from './validators';
import RateLimitor from '../../common/core/middlewares/rate-limiter';

export class PostRoutes implements IRoute {
  public router = Router();
  path: '/posts';
  private postController = new PostController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`/`, [
      RequestValidator({ validators: CreatePostValidator, type: VALIDATION_TYPE.REQ_BODY }),
      this.postController.addPost,
    ]);

    this.router.get(`/count`, [
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.postController.getPostListCount,
    ]);
    this.router.get(`/`, [
      RateLimitor({
        points: 10, // 10 Requests
        duration: 10, // 10 Seconds
        message: 'Too many requests, please try again later.',
      }),
      RequestValidator({
        validators: ListValidator,
        type: VALIDATION_TYPE.REQ_QUERY,
        skipMissingProperties: true,
      }),
      this.postController.getPostList,
    ]);
    this.router.get(`/:postId`, [
      RequestValidator({
        validators: IdValidator,
        type: VALIDATION_TYPE.REQ_PARAMS,
        paramName: 'postId',
      }),
      this.postController.getPost,
    ]);
    this.router.put(`/:postId`, this.postController.updatePost);
    this.router.delete(`/:postId`, this.postController.deletePost);
  }
}
