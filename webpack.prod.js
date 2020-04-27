const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: "./src/client/index.js",
    tripEntry: "./src/client/myTrips.js"
  },
  mode: "production",
  output: { libraryTarget: "var", library: "Client" },
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg)$/,
        loader: "url-loader"
      },
      {
        test: /\.(png|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images"
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
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
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new WorkboxPlugin.GenerateSW(),
    new Dotenv()
  ]
};
