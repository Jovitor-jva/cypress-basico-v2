const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,  // ou .tsx se usar TypeScript
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
              },
            },
          },
        ],
      },
    },
  };

  on('file:preprocessor', webpack(options));

  return config;
};
