const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { register } = require('module');

module.exports = {
  entry: {
    app: "./src/scripts/index.js",
    profile: "./src/scripts/profile.js",
    kegiatan: "./src/scripts/kegiatan.js",
    detailkegiatan: "./src/scripts/detailkegiatan.js",
    program: "./src/scripts/program.js",
    jadwal: "./src/scripts/jadwal.js",
    jenislayanan: "./src/scripts/jenislayanan.js",
    login: "./src/scripts/login.js",
    register: "./src/scripts/register.js",
    lupapassword: "./src/scripts/lupapassword.js",
    pembayaran: "./src/scripts/pembayaran.js",
    langganan: "./src/scripts/langganan.js",
    admin: "./src/scripts/admin.js",
    skalamingguan: "./src/scripts/skalamingguan.js",
    skalaharian: "./src/scripts/skalaharian.js",
    uplangganan: "./src/scripts/uplangganan.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
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
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              publicPath: 'assets/img',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      firebase: path.resolve(__dirname, "node_modules/firebase"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'profile.html',
      template: path.resolve(__dirname, 'src/templates/profile.html'),
      chunks: ['profile'],
    }),
    new HtmlWebpackPlugin({
      filename: 'kegiatan.html',
      template: path.resolve(__dirname, 'src/templates/kegiatan.html'),
      chunks: ['kegiatan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailkegiatan.html',
      template: path.resolve(__dirname, 'src/templates/detailkegiatan.html'),
      chunks: ['detailkegiatan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'program.html',
      template: path.resolve(__dirname, 'src/templates/program.html'),
      chunks: ['program'],
    }),
    new HtmlWebpackPlugin({
      filename: 'jadwal.html',
      template: path.resolve(__dirname, 'src/templates/jadwal.html'),
      chunks: ['jadwal'],
    }),
    new HtmlWebpackPlugin({
      filename: 'jenislayanan.html',
      template: path.resolve(__dirname, 'src/templates/jenislayanan.html'),
      chunks: ['jenislayanan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'langganan.html',
      template: path.resolve(__dirname, 'src/templates/langganan.html'),
      chunks: ['langganan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/templates/login.html'),
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/templates/register.html'),
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      filename: 'lupapassword.html',
      template: path.resolve(__dirname, 'src/templates/lupapassword.html'),
      chunks: ['lupapassword'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pembayaran.html',
      template: path.resolve(__dirname, 'src/templates/pembayaran.html'),
      chunks: ['pembayaran'],
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: path.resolve(__dirname, 'src/templates/admin.html'),
      chunks: ['admin'],
    }),
    new HtmlWebpackPlugin({
      filename: 'skalamingguan.html',
      template: path.resolve(__dirname, 'src/templates/skalamingguan.html'),
      chunks: ['skalamingguan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'skalaharian.html',
      template: path.resolve(__dirname, 'src/templates/skalaharian.html'),
      chunks: ['skalaharian'],
    }),
    new HtmlWebpackPlugin({
      filename: 'uplangganan.html',
      template: path.resolve(__dirname, 'src/templates/uplangganan.html'),
      chunks: ['uplangganan'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'public/'),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/public/assets/img', to: 'assets/img' }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
  },
};
