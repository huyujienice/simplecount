const path = require("path");
const commonConfig = require("../webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    hot: true,
    open: true,
    port: 8099,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
  ],
};

module.exports = merge(commonConfig, config);
