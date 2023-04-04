import { ERROR } from '../../common/core/handlers/consts/error';
import { HttpException } from '../../common/core/handlers/error/HttpException';
import { Todo } from './todo.model';
import { ICreateTodo, ITodo } from './interfaces/todo.interface';
import { IExtraQuery, IGetOne, IRequestQuery } from '../../common/core/interfaces';

export class TodoService {
  private deleteCheck: Record<string, any> = { deleted_at: null };

  public async getListCount({ status, search }: IRequestQuery | any): Promise<number> {
    const where: Record<string, any> = { ...this.deleteCheck };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { $regex: search };
    }

    return Todo.count(where);
  }

  public async getList(
    { page_no, page_size, status, sort_by, sort_order, search, ids }: IRequestQuery,
    condition: IExtraQuery = {},
  ): Promise<ITodo[]> {
    const limit = page_size;
    const skip = (page_no - 1) * limit;

    const where: Record<string, any> = { ...this.deleteCheck, ...condition };
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

    return Todo.find(where, null, {
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
  public async getOne({ id }: IGetOne): Promise<ITodo> {
    const item = await Todo.findOne({ _id: id, ...this.deleteCheck });

    if (!item) throw new HttpException(ERROR.NOT_FOUND, 'Todo not found.');

    return item;
  }

  /**
   * NOTE: Must return with two type. one with <Todo> and second with <any>
   * @param param0
   */
  public async createOne(data: ICreateTodo): Promise<ITodo> {
    return Todo.create(data);
  }

  public async updateOne(id: string, data: Record<string, any>): Promise<ITodo> {
    const updatedData = await Todo.updateOne({ _id: id }, data);
    if (updatedData.modifiedCount > 0) {
      return this.getOne({ id });
    }
    throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not update user data.');
  }

  public async deleteOne(id: string): Promise<Record<string, any>> {
    const updatedData = await Todo.updateOne({ _id: id }, { deleted_at: new Date() });

    if (!updatedData.modifiedCount) {
      throw new HttpException(ERROR.PRECONDITION_FAILED, 'Could not delete user.');
    }
    return { message: 'Todo Deleted Successfully' };
  }
}
