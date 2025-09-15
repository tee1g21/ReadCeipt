// babel.config.cjs
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // TEMP: comment NativeWind until we confirm Babel is healthy.
    // plugins: ['nativewind/babel'],
  };
};