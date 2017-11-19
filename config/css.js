const autoprefixer = require('autoprefixer');

module.exports = ({ sourceMap, minimize }) => ([
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap,
      importLoaders: 1,
      minimize,
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      // Necessary for external CSS imports to work
      // https://github.com/facebookincubator/create-react-app/issues/2677
      ident: 'postcss',
      sourceMap,
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
      ],
    },
  },
]);

