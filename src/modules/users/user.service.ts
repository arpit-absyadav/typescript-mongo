import { ERROR } from './../../common/core/handlers/consts/error';
import { HttpException } from '../../common/core/handlers/error/HttpException';
import { User } from './user.model';
import { ICreateUser, IUser } from './interfaces/user.interface';
import { IRequestQuery } from '../../common/core/interfaces';
interface IGetUser {
  id: string;
}

export class UserService {
  public async getListCount({ user_id, status, search }: IRequestQuery | any): Promise<number> {
    const where: any = { user_id };
    if (status) {
      where.status = status;
    }

    if (search) {
      // where.name = {
      //   [Op.like]: `%${search}%`,
      // };
    }

    return User.count();
  }

  public async getList({
    user_id,
    page_no,
    page_size,
    status,
    sort_by,
    sort_order,
    search,
    ids,
  }: IRequestQuery | any): Promise<IUser[]> {
    const limit = page_size;
    const offset = (page_no - 1) * limit;

    const where: any = { user_id };

    if (ids) {
      where.id = ids;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      // where.name = {
      //   [Op.like]: `%${search}%`,
      // };
    }

    const order: any = [];
    order.push([sort_by, sort_order]);
    console.log(where, order, offset);

    return User.find();
  }

  /**
   * getOne
   */
  public async getOne({ id }: IGetUser): Promise<IUser> {
    const item = await User.findOne({ _id: id }, { salt: 0, hash: 0, refresh_token: 0 });

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'User not found.');

    return item;
  }

  /**
   * getOne
   */
  public async getByEmail({ email }: { email: string }): Promise<IUser> {
    const item = await User.findOne({ email });

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

  // public async updateOne({ enable, user_id, id, name, description }: IUpdateUser): Promise<IUser> {
  //   const item: IUser | any = await this.getOne({
  //     user_id,
  //     id,
  //   });

  //   item.name = name !== undefined ? name : item.name;
  //   item.description = description !== undefined ? description : item.description;

  //   return item.save();
  // }
  // public async deleteOne({ user_id, id }: IGetUser): Promise<IUser> {
  //   const item: IUser | any = await this.getOne({
  //     user_id,
  //     id,
  //   });

  //   if (item.status === STATUS.ENABLED) {
  //     return error.throwPreconditionFailed({
  //       message: "Enabled user can't be deleted",
  //     });
  //   }

  //   return item.destroy();
  // }
}
