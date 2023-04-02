import { ERROR } from '../../common/core/handlers/consts/error';
import { HttpException } from '../../common/core/handlers/error/HttpException';
import { Comment } from './comment.model';
import { ICreateComment, IComment } from './interfaces/comment.interface';
import { IRequestQuery } from '../../common/core/interfaces';
import { IGetOne } from '../../common/core/interfaces';

export class CommentService {
  private deleteCheck: Record<string, any> = { deleted_at: null };

  public async getListCount({ status, search }: IRequestQuery | any): Promise<number> {
    const where: Record<string, any> = { ...this.deleteCheck };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { $regex: search };
    }

    return Comment.count(where);
  }

  public async getList({
    page_no,
    page_size,
    status,
    sort_by,
    sort_order,
    search,
    ids,
  }: IRequestQuery | any): Promise<IComment[]> {
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

    return Comment.find(where, {
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
  public async getOne({ id }: IGetOne): Promise<IComment> {
    const item = await Comment.findOne({ _id: id, ...this.deleteCheck });

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'Comment not found.');

    return item;
  }

  /**
   * NOTE: Must return with two type. one with <Comment> and second with <any>
   * @param param0
   */
  public async createOne(data: ICreateComment): Promise<IComment> {
    return Comment.create(data);
  }

  public async updateOne(id: string, data: Record<string, any>): Promise<IComment> {
    const updatedData = await Comment.updateOne({ _id: id }, data);
    if (updatedData.modifiedCount > 0) {
      return this.getOne({ id });
    }
    throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not update comment data.');
  }

  public async deleteOne(id: string): Promise<Record<string, any>> {
    const updatedData = await Comment.updateOne({ _id: id }, { deleted_at: new Date() });

    if (!updatedData.modifiedCount) {
      throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not delete comment.');
    }
    return { message: 'Comment Deleted Successfully' };
  }
}
