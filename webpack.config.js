const path = require('path'); // Add this line
const { AngularWebpackPlugin } = require('@ngtools/webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new AngularWebpackPlugin({
      tsConfigPath: './tsconfig.app.json',
      entryModule: path.join(__dirname, './src/app/app.module#AppModule'),
    }),
  ],
};
