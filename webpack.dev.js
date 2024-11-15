const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
var path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 5173,
    historyApiFallback: true,
  },
});
