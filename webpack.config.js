const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: "/"
  },
  mode,
  devServer: {
    contentBase: "./src",
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  resolve: {
    alias: {
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Containers": path.resolve(__dirname, "src/containers/"),
      "@Assets": path.resolve(__dirname, "src/assets/"),
      "@Redux": path.resolve(__dirname, "src/redux/"),
      "@Services": path.resolve(__dirname, "src/services/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
      "@Constants": path.resolve(__dirname, "src/constants/"),
      "@Theme": path.resolve(__dirname, "src/theme/"),
      "@Helpers": path.resolve(__dirname, "src/helpers/")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", {}]]
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|pdf|mp4|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      favicon: __dirname + "/public/favicon.png",
      filename: "index.html",
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new Dotenv({
      path: `./.env`
    }),
    new CaseSensitivePathsPlugin()
  ]
};
