const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/src'),
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		compress: true,
		port: 3000,
	},
	devtool: 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules)/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [
					// { loader: MiniCssExtractPlugin.loader },
					'style-loader',
					'css-loader',
				],
			},
		],
	},
	// plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
}
