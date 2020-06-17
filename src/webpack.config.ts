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
        loader: require.resolve("file-loader"),
        include: /\.(jpg|png|gif|txt|json)$/,
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: [require.resolve("raw-loader"), require.resolve("glslify-loader")],
      },
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
