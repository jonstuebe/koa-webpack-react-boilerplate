import Router from "koa-router";
import faker from "faker";

export default (app, router) => {
  const api = new Router({
    prefix: "/api"
  });

  api.get("/", ctx => {
    ctx.body = {
      message: "Hello World"
    };
  });

  router.use(api.routes());
};
