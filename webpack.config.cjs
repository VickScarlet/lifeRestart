const path = require("path");
const resolve = dir => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlgin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")


module.exports = {
  mode: 'production',
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: resolve("./view"),
    filename: "./scripts/[name].js",
    clean: true
  },
  performance: {
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000 // 最大资源文件大小
  },
  devServer:{
    compress: true,
    port: 8081,
    hot: true,
    static: [
      {
        directory: resolve("./data"),
        publicPath: "/data"
      },
      {
        directory: resolve("./public/images"),
        publicPath: "/images"
      },
      {
        directory: resolve("./public/styles"),
        publicPath: "/styles"
      },
      {
        directory: resolve("./view"),
        publicPath: "/view"
      },
      {
        directory: resolve("./src"),
        publicPath: "/src"
      },
      {
        directory: resolve("./lib"),
        publicPath: "/lib"
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            resourceQuery: "?light",
            use: [
              MiniCssExtractPlgin.loader,
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  additionalData: `@use 'theme/light-vars' as vars;`,
                },
              },
            ],
          },
          {
            resourceQuery: "?dark",
            use: [
              MiniCssExtractPlgin.loader,
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  additionalData: `@use 'theme/dark-vars' as vars;`,
                },
              },
            ],
          },
          {
            use: [
              MiniCssExtractPlgin.loader,
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  additionalData: `@use 'theme/light-vars' as vars;`,
                },
              },
            ],
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "targets": "> 0.25%, not dead",
                  "useBuiltIns": "usage",
                  "corejs": "3.8.3",
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // html 
    new HtmlWebpackPlugin({
      template: resolve("./public/index.html"),
      filename: "index.html",
      inject: "body"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从public中复制文件
          from: resolve("./public"),
          // 把复制的文件存放到dis里面
          to: resolve("./view"),
          globOptions: {
            ignore: ["**/index.html"]
          }
        }
      ]
    }, {
      ignore: ["*.html"]
    }),
    new MiniCssExtractPlgin({
      filename: "[name].css",
      attributes: {
        id: "theme"
      }
    })
  ]
}
