import Koa from "koa";
import serve from "koa-static";
import Router from "koa-router";

import api from "./api";

const PORT = process.env.PORT || 8080;

const app = new Koa();
const router = new Router();

app.use(serve(__dirname + "/build"));

api(app, router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
