import axios from "axios";
import { IMovie, IReturnResult, ISearchCondition } from "./CommonTypes";

axios.defaults.baseURL = "http://localhost:3000/movie"
export class MovieService {
  public static async add(movie: IMovie): Promise<IReturnResult<any>> {
    const { data } = await axios.post("/", movie);
    return data;
  }
  public static async edit(id: string, movie: Partial<IMovie>): Promise<IReturnResult<any>> {
    const { data } = await axios.put("/" + id, movie);
    return data;
  }
  public static async delete(id: string): Promise<IReturnResult<any>> {
    const { data } = await axios.delete("/" + id);
    return data;
  }
  public static async getById(id: string): Promise<IMovie> {
    const { data } = await axios.get("/" + id);
    return data.data;
  }
  public static async getByCondition(condition: ISearchCondition): Promise<IReturnResult<IMovie>> {
    const { data } = await axios.get("/", {
      params: condition
    });
    return data;
  }
}