const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = [
  {
    entry: "./src/index.tsx",
    mode: "development",
    target: "web",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      clean: true,
      assetModuleFilename: "assets/[name].[ext]",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "build"),
      },
      port: 3000,
      open: false,
      hot: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
      ],
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        title: "My Recipes",
        inject: true,
      }),
      new MiniCssExtractPlugin(),
    ],
  },
];
