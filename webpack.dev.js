const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: "./src/client/index.js",
    tripEntry: "./src/client/myTrips.js"
  },
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  output: {},
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg)$/,
        loader: "url-loader"
      },
      {
        test: /\.(png|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
      chunks: ["main"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/myTrip.html",
      filename: "./myTrip.html",
      chunks: ["tripEntry"]
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new Dotenv({
      safe: true
    })
  ]
};
