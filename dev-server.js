import Koa from "koa";
import middleware from "koa-webpack";
import proxy from "koa-proxy";
import config from "./webpack.config";
import Webpack from "webpack";

const app = new Koa();
const compiler = Webpack(config);

const PORT = process.env.APP_PORT || 3000;

app.use(middleware({ compiler }));
app.use(
  proxy({
    host: `http://localhost:${process.env.PORT || 8080}`,
    match: /^\/api\//
  })
);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
