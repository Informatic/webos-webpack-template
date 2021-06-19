const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const AddAssetWebpackPlugin = require("add-asset-webpack-plugin");

module.exports = (env) => [
  // Web configuration
  {
    mode: env.production ? 'production' : 'development',

    target: 'es5',

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      index: './frontend/index.js',
      // userScript: './src/userScript.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: ({ chunk: { name } }) => (name === 'userScript') ? 'webOSUserScripts/[name].js' : '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
        },
        /*
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        */
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { context: 'assets', from: '**/*' },
          { context: 'frontend', from: 'index.html' },
        ]
      }),
      new AddAssetWebpackPlugin('appinfo.json', (compilation) => {
        const packageJson = require('./package.json');
        const appinfoJson = require('./appinfo.json');
        return JSON.stringify({
          ...appinfoJson,
          id: packageJson.name,
          version: packageJson.version,
        });
      }),
    ],
  },
  // Service configuration
  {
    mode: env.production ? 'production' : 'development',

    target: 'es5',

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      service: './service/service.js',
      // userScript: './src/userScript.js',
    },
    output: {
      path: path.resolve(__dirname, './dist/service'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { context: 'service', from: '*.json' },
        ]
      }),
    ],
  },
];
