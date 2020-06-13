import webpack from "webpack";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

import { paths } from "./paths";

const templatePath = path.resolve(__dirname, "../public/index.html");

export const config: Configuration = {
  entry: {
    app: [
      "webpack-hot-middleware/client?reload=true&timeout=1000&noInfo=true",
      "regenerator-runtime/runtime.js",
      paths.appEntry,
    ],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [require.resolve("@babel/preset-env")],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: false,
          inputSourceMap: false,
        },
      },
      {
        loader: require.resolve("file-loader"),
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: templatePath }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
