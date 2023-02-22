require('dotenv').config();
const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PORT = process.env.PORT || 3000;

module.exports = ({ ENV, TARGET }) => {
  const isProd = ENV === 'production';
  const isWeb = TARGET === 'web';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    entry: isWeb ? './src/Web.tsx' : './src/Extension.tsx',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '/dist'),
      publicPath: '/',
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@shared': path.resolve(__dirname, './src/_shared'),
        '@layout': path.resolve(__dirname, './src/_layout'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(webp|jpg|png|jpeg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        hash: false,
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.IS_WEB': JSON.stringify(isWeb),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/*.png'),
            to() {
              return '[name][ext]';
            },
          },
          {
            from: path.resolve(__dirname, 'public/icons'),
            to() {
              return 'icons/[name][ext]';
            },
          },
          {
            from: path.resolve(__dirname, 'public/manifest.json'),
            to: 'manifest.json',
          },
          ...(!isWeb
            ? [
                {
                  from: path.resolve(__dirname, 'public/favicon.png'),
                  to: 'icons/icon16.png',
                },
              ]
            : []),
        ],
      }),
    ],
    experiments: {
      topLevelAwait: true,
    },
    devServer: {
      host: 'localhost',
      port: PORT,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  };
};
