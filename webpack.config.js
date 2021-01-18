// Imports: Dependencies
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
// Webpack Configuration
const config = {
  mode: 'production',

  // Entry
  entry: './server.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  // Loaders
  module: {
    rules: [
      // JavaScript Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },

  target: 'node',

  node: {
    // Don't replace __dirname and __filename in the bundle.
    __dirname: false,
    __filename: false,
  },

  // Don't bundle node modules, except polyfills.
  externals: [
    webpackNodeExternals({
      whitelist: ['core-js', 'regenerator-runtime'],
    }),
  ],
  // Plugins
  plugins: []
};
// Exports
module.exports = config;
