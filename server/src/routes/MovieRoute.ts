import { MovieService } from "../services/MovieService";
import routerCreater from "koa-router";
const router = new routerCreater({
  prefix: "/movie",
  sensitive: true
});
router.get("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    const movie = await MovieService.queryById(id);
    ctx.body = movie;
  } catch (error) {
    ctx.body = {
      msg: "修改失败",
      error: "id错误"
    };
  }
});
router.get("/", async (ctx) => {
  const movie = await MovieService.queryByCondition(ctx.query);
  ctx.body = movie;
});
router.post("/", async (ctx) => {
  const movie = await MovieService.add(ctx.request.body);
  ctx.body = movie;
});
router.put("/:id", async (ctx) => {
  try {
    const result = await MovieService.edit(ctx.params.id, ctx.request.body);
    ctx.body = result;
  } catch (error) {
    ctx.body = {
      msg: "修改失败",
      error: "id错误"
    };
  }
});
router.delete("/:id", async (ctx) => {
  try {
    const result = await MovieService.delete(ctx.params.id);
    console.log(result);
    ctx.body = result;
  } catch (error) {
    ctx.body = ctx.body = {
      msg: "修改失败",
      error: "id错误"
    };
  }
});
export default router;