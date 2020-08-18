var path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      loader: "url-loader",
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader", // creates style nodes from JS strings
        },
        {
          loader: "css-loader", // translates CSS into CommonJS
        },
        {
          loader: "sass-loader", // compiles Sass to CSS
        },
      ],
    },
  ],
};
