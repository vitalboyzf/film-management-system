import MovieModel from "./MovieSchema";
import Mongoose from "mongoose";
Mongoose.connect("mongodb://localhost:27017/moviedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log("连接数据库成功");
});
export { MovieModel };