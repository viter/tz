import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';

const loader = {
  rules: [
    {
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
        },
      },
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ],
};

const resolve = {
  extensions: ['.js', '.jsx'],
};

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: './src/server.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'api/index.js',
  },
  module: loader,
  plugins: [],
  resolve,
};

const clientConfig = {
  target: 'web',
  mode: 'production',
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve('dist'),
    publicPath: '/static',
    filename: 'static/client.js',
  },
  module: loader,
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve('src', 'client', 'index.html'),
    }),
  ],
  resolve,
};

export default [serverConfig, clientConfig];
