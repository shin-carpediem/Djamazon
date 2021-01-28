// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: "development",
  // context: __dirname,
  // エントリーポイントの設定
  entry: "./static/js/main.js",
  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, "static/webpack_bundles/"),
    // 出力するファイル名
    filename: "bundle.js",
  },
  plugins: [
    new BundleTracker({ filename: "./webpack-stats.json" }),
  ],
};
