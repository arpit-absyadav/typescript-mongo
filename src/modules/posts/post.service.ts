import { ERROR } from '../../common/core/handlers/consts/error';
import { HttpException } from '../../common/core/handlers/error/HttpException';
import { Post } from './post.model';
import { ICreatePost, IPost } from './interfaces/post.interface';
import { IGetOne, IRequestQuery } from '../../common/core/interfaces';
import { Cache } from '../../common/core/decorators/cache';

export class PostService {
  private deleteCheck: Record<string, any> = { deleted_at: null };

  public async getListCount({ status, search }: IRequestQuery | any): Promise<number> {
    const where: Record<string, any> = { ...this.deleteCheck };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { $regex: search };
    }

    return Post.count(where);
  }

  @Cache(10)
  public async getList({
    page_no,
    page_size,
    status,
    sort_by,
    sort_order,
    search,
    ids,
  }: IRequestQuery | any): Promise<IPost[]> {
    const limit = page_size;
    const skip = (page_no - 1) * limit;

    const where: Record<string, any> = { ...this.deleteCheck };
    const order: Record<string, any> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { $regex: search };
    }

    if (ids) {
      where._id = {
        $in: ids,
      };
    }

    if (sort_by) {
      order[sort_by] = sort_order;
    }

    return Post.find(where, {
      skip,
      limit,
      sort: {
        ...order,
      },
    }).lean();
  }

  /**
   * getOne
   */
  public async getOne({ id }: IGetOne): Promise<IPost> {
    const item = await Post.findOne({ _id: id, ...this.deleteCheck });

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'Post not found.');

    return item;
  }

  /**
   * NOTE: Must return with two type. one with <Post> and second with <any>
   * @param param0
   */
  public async createOne(data: ICreatePost): Promise<IPost> {
    return Post.create(data);
  }

  public async updateOne(id: string, data: Record<string, any>): Promise<IPost> {
    const updatedData = await Post.updateOne({ _id: id }, data);
    if (updatedData.modifiedCount > 0) {
      return this.getOne({ id });
    }
    throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not update post data.');
  }

  public async deleteOne(id: string): Promise<Record<string, any>> {
    const updatedData = await Post.updateOne({ _id: id }, { deleted_at: new Date() });

    if (!updatedData.modifiedCount) {
      throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not delete post.');
    }
    return { message: 'Post Deleted Successfully' };
  }
}
