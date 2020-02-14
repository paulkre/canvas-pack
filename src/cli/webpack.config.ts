import webpack from "webpack";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

import { paths } from "./paths";

const templatePath = path.resolve(__dirname, "../../public/index.html");

export const config: Configuration = {
  entry: {
    app: [
      "webpack-hot-middleware/client?reload=true&timeout=1000",
      paths.appEntry
    ]
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: { configFile: paths.appTsConfig }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: templatePath }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
};
