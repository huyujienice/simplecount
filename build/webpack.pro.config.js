const path = require("path");
const commonConfig = require("../webpack.config");
const { merge } = require("webpack-merge");

const config = {
  entry: "./src/buildindex.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "simplecount.js",
    library: "simplecountjs",
  },
};

module.exports = merge(commonConfig, config);
