const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname);
const srcPath = path.join(rootPath, "src");
const outPath = path.join(rootPath, "dist");

module.exports = (env, argv) => {
  const isDevelopmentMode = !argv || argv.mode === "development";

  return {
    devtool: isDevelopmentMode ? "inline-source-map" : false,
    entry: path.join(srcPath, "index.tsx"),
    target: ["web", "es2018"],
    output: {
      path: outPath,
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".js", ".tsx", ".jsx"],
      alias: {
        "@": [srcPath],
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: "ts-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(srcPath, "Template.html"),
      }),
    ],
    devServer: {
      open: true,
    },
  };
};
