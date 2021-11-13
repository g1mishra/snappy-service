const CompressionPlugin = require('compression-webpack-plugin'); // gzip
const BrotliPlugin = require('brotli-webpack-plugin'); // brotli

module.exports = function override(config) {
  const optimization = config.optimization;
  config.plugins.push(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
  optimization.splitChunks = {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 10000,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          return `npm.${packageName.replace('@', '')}`;
        },
      },
    },
  };
  optimization.runtimeChunk = 'single';
  return config;
};
