const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: ['/node_modules/'],
            use: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.gif$/,
            type: 'asset/inline',
          },
          {
            test: /\.(ttf|eot|svg)$/,
            type: 'asset/resource',
          },
    ],
  },
};