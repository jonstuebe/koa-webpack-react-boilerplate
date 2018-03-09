require("dotenv").config();

const path = require("path");

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const distFolder = path.resolve(__dirname, "build");
const NODE_ENV = process.env.NODE_ENV || "development";

const productionPlugins =
  NODE_ENV === "production"
    ? [new UglifyJSPlugin(), new CleanWebpackPlugin(["build"])]
    : [];

const developmentPlugins = NODE_ENV === "development" ? [] : [];

const envs = Object.keys(process.env)
  .filter(key => /^REACT_APP_/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    { NODE_ENV }
  );

module.exports = {
  mode: NODE_ENV,
  entry: ["./polyfills.js", "./src/index.js"],
  output: {
    filename: "[name].[hash].js",
    path: distFolder,
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Create React App",
      xhtml: true,
      template: "public/index.html"
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      "process.env": Object.keys(envs).reduce((env, key) => {
        env[key] = JSON.stringify(envs[key]);
        return env;
      }, {})
    }),
    ...developmentPlugins,
    ...productionPlugins
  ]
};
