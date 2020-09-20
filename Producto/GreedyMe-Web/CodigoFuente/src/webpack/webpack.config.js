var path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  rules: [
    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "images/[hash]-[name].[ext]",
          },
        },
      ],
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
