const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Главный файл, с которого начинается программа
  entry: './src/script.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
  module: {
    rules: [
      {
        // Обрабатываем CSS файлы
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
  plugins: [
    // Автоматически добавляет скрипты в HTML
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  
  // Настройки сервера для разработки
  devServer: {
    static: './dist',
    open: true,
    port: 3000
  }
};