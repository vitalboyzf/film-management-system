import routerCreater from "koa-router";
import path from "path";
const router = new routerCreater({
  prefix: "/upload",
  sensitive: true
});
router.post("/", async ctx => {
  const img = ctx.request.files!.img;
  const returnPath = path.basename(img.path);
  ctx.body = {
    path: `${ctx.origin}/imgs/${returnPath}`
  };
});
export default router;