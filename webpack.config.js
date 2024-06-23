const path = require('path');
const warningSerializer = require('./webpackWarningSerializer');

module.exports = {
  // Other configurations...

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              cache: false // Disable caching for postcss-loader
            }
          }
        ]
      }
    ]
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    store: 'pack',
    allowCollectingMemory: true,
    managedPaths: [path.resolve(__dirname, 'node_modules')],
    serialization: {
      customSerializers: [warningSerializer]
    }
  },
  stats: {
    warningsFilter: (warning) => {
      return /some-specific-warning-regex/.test(warning.message);
    }
  }
};
