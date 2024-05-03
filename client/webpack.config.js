const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // stats: {
    //   children: true,
    // },
    devtool: 'source-map',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest:'src-sw.js',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
        title: 'J.A.T.E. PWA',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E. PWA',
        short_name: 'J.A.T.E.',
        description: 'Text Editor PWA',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        start_url: './',
        id: '/',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // Add CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },
  };
};
