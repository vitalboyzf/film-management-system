import { Movie } from "../entities/Movie";
import Mongoose from "mongoose";
export interface IMovie extends Movie, Mongoose.Document { }
const movieSchame = new Mongoose.Schema<IMovie>({
  name: String,
  types: [String],
  areas: [String],
  timeLong: Number,
  isHot: Boolean,
  isComing: Boolean,
  isClassic: Boolean,
  description: String,
  poster: String
}, {
  versionKey: false
});
export default Mongoose.model<IMovie>("Movie", movieSchame);