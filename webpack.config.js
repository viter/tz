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
    filename: 'server.cjs',
  },
  module: loader,
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3001,
    }),
  ],
  resolve,
};

const clientConfig = {
  target: 'web',
  mode: 'production',
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve('dist'),
    publicPath: '/static',
    filename: 'client.js',
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
