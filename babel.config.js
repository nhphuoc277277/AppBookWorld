module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@i18n': './src/i18n',
          '@hooks': './src/hooks',
          '@common': './src/common',
          '@redux': './src/redux',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
