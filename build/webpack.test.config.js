const path = require("path");
const commonConfig = require("../webpack.config");
const { merge } = require("webpack-merge");

const config = {
  entry: "./test/add.test.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
  }
};

module.exports = merge(commonConfig, config);