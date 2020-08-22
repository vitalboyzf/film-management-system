import { Movie } from "../entities/Movie";
import { MovieModel } from "../db/index";
import { SearchCondition } from "../entities/SearchCondition";
export interface IReturnResult {
  status: number;
  msg: string;
  data?: any;
  error?: any;
  count?: number;
}
export class MovieService {
  public static async add(movie: Movie): Promise<IReturnResult> {
    // 转化类型
    movie = Movie.transform(movie);
    // 数据验证
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return {
        msg: "添加失败",
        status: 401,
        error: errors
      };
    }
    // 添加到数据库
    const result = await MovieModel.create(movie);
    return {
      msg: "添加成功",
      status: 200,
      data: result
    };
  }
  /**
   * @param id 电影id
   * @param movie 新的电影数据对象
   */
  public static async edit(id: string, movie: Movie): Promise<IReturnResult> {
    // 转化类型
    const movieObj = Movie.transform(movie);
    // 数据验证
    const errors = await movieObj.validateThis(true);
    if (errors.length > 0) {
      return {
        msg: "修改失败",
        status: 401,
        error: errors
      };
    }
    // 更新数据库
    const result = await MovieModel.updateOne({ _id: id }, movie);
    return {
      msg: "修改成功",
      status: 200,
      data: result
    };
  }

  public static async delete(id: string): Promise<IReturnResult> {
    const result = await MovieModel.deleteOne({ _id: id });
    if (!result.deletedCount) {
      return {
        msg: "删除失败",
        status: 401,
      };
    }
    return {
      msg: "删除成功",
      status: 200,
      data: result
    };
  }
  public static async queryById(id: string): Promise<IReturnResult> {
    const result = await MovieModel.findById(id);
    return {
      msg: "查询成功",
      status: 200,
      data: result
    };
  }
  public static async queryAllMovie(): Promise<IReturnResult> {
    const result = await MovieModel.find();
    return {
      msg: "查询成功",
      status: 200,
      data: result
    };
  }
  public static async queryByCondition(condition: SearchCondition): Promise<IReturnResult> {
    // 转化类型 将平面对象转化为SearchCondition对象
    const conObj = SearchCondition.transform(condition);
    // 数据验证
    const errors = await conObj.validateThis();
    if (errors.length > 0) {
      return {
        msg: "查询失败",
        status: 401,
        error: errors
      };
    }
    const result = await MovieModel.find({
      name: new RegExp(conObj.key)
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
    const count = await MovieModel.find({
      name: new RegExp(conObj.key)
    }).countDocuments();
    return {
      msg: "查询成功",
      status: 200,
      count,
      data: result
    };
  }
}