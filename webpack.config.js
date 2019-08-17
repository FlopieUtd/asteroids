const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: `${path.resolve(__dirname)}/dist`,
    publicPath: `${path.resolve(__dirname)}/test2`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  devServer: {
    port: 9000,
    contentBase: `${path.resolve(__dirname)}/`
  },
  node: {
    __dirname: false,
    __filename: false
  }
};
