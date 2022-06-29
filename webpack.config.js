const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // entry: "./src/buildindex.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "simplecount.js",
    library: "simplecountjs",
  },
  devServer: {
    hot: true,
    open: true,
    port: 8099,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
  ],
};
