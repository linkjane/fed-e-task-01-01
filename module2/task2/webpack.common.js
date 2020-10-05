const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              esModule: false,
              fallback: require.resolve('file-loader')
            }
          },
          ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '拉钩作业',
      template: './public/index.html',
      templateParameters: {
        BASE_URL: './'
      }

    }),

    new VueLoaderPlugin(),
  ]
}
