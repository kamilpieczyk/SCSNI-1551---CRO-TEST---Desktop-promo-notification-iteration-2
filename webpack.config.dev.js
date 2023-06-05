const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = "style-loader";
const ASSET_PATH = process.env.ASSET_PATH || '/';

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    static: { 
      directory: path.resolve(__dirname, './src/static'), 
      publicPath: '/assets'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    })
  ],
  "resolve": { 
    "alias": { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
      "@components": path.resolve(__dirname, "src", "components"),
      "@controllers": path.resolve(__dirname, "src", "controllers"),
      "@style": path.resolve(__dirname, "src", "global-styles"),
      "@store": path.resolve(__dirname, "src", "store"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", {loader: "sass-loader", options: { implementation: require.resolve("sass") }}]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    // minimize: false,
    chunkIds: 'named',
    moduleIds: 'named'
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
