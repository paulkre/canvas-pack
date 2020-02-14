import express from "express";
import { Compiler } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { api } from "./api";

export function startServer(webpackCompiler: Compiler) {
  const app = express();

  app.use(
    webpackDevMiddleware(webpackCompiler, {
      publicPath: "/",
      stats: "errors-warnings"
    })
  );
  app.use(webpackHotMiddleware(webpackCompiler));

  app.use("/api", api);

  const server = app.listen(3000);

  function shutdown() {
    server.close();
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
