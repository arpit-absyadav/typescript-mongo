import { ERROR } from '../../common/core/handlers/consts/error';
import { HttpException } from '../../common/core/handlers/error/HttpException';
import { User } from './comment.model';
import { ICreateUser, IUser } from './interfaces/comment.interface';
import { IRequestQuery } from '../../common/core/interfaces';
interface IGetUser {
  id: string;
}

export class UserService {
  private privateFields: Record<string, any> = { salt: 0, hash: 0, refresh_token: 0 };
  private deleteCheck: Record<string, any> = { deleted_at: null };
  public async getListCount({ status, search }: IRequestQuery | any): Promise<number> {
    const where: Record<string, any> = { ...this.deleteCheck };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { $regex: search };
    }

    return User.count(where);
  }

  public async getList({
    page_no,
    page_size,
    status,
    sort_by,
    sort_order,
    search,
    ids,
  }: IRequestQuery | any): Promise<IUser[]> {
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

    return User.find(where, this.privateFields, {
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
  public async getOne({ id }: IGetUser): Promise<IUser> {
    const item = await User.findOne({ _id: id, ...this.deleteCheck }, this.privateFields);

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'User not found.');

    return item;
  }

  /**
   * getOne
   */
  public async getByEmail({ email }: { email: string }): Promise<IUser> {
    const item = await User.findOne({ email, ...this.deleteCheck });

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'User not found.');
    return item;
  }

  /**
   * NOTE: Must return with two type. one with <User> and second with <any>
   * @param param0
   */
  public async createOne(data: ICreateUser): Promise<IUser> {
    return User.create(data);
  }

  public async updateOne(id: string, data: Record<string, any>): Promise<IUser> {
    const updatedData = await User.updateOne({ _id: id }, data);
    if (updatedData.modifiedCount > 0) {
      return this.getOne({ id });
    }
    throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not update user data.');
  }

  public async deleteOne(id: string): Promise<Record<string, any>> {
    const updatedData = await User.updateOne({ _id: id }, { deleted_at: new Date() });

    if (!updatedData.modifiedCount) {
      throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not delete user.');
    }
    return { message: 'User Deleted Successfully' };
  }
}
