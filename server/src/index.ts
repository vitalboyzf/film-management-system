import "reflect-metadata";
import Koa from "koa";
import path from "path";
import koaBody from "koa-body";
import movieRoute from "./routes/MovieRoute";
import uploadRoute from "./routes/UploadRoute";
import koaStatic from "koa-static";
import cors from "koa2-cors";
const app = new Koa();
// 静态资源服务器
app.use(cors());
app.use(koaStatic(path.resolve(__dirname, "../public")));
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.resolve(__dirname, "../public/imgs"),
    keepExtensions: true
  }
}));
app.use(uploadRoute.routes());
app.use(movieRoute.routes());
app.use(movieRoute.allowedMethods());
app.listen(3000, () => {
  console.log("监听3000");
});

