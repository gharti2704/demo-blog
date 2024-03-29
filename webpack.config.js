const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

const SRC_DIR = path.join(__dirname, "client", "src");
const OUT_DIR = path.join(__dirname, "client", "dist");

module.exports = {
  entry: path.join(SRC_DIR, "index.js"),
  output: {
    filename: "bundle.js",
    path: OUT_DIR,
  },
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
