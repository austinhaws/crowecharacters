const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// where does source live
const APP_DIR = path.resolve(__dirname, '');

// where does compiled code go
const BUILD_DIR = path.resolve(__dirname, '../js/bundles');

// put the scss and css into a single file
const cssExtract = new MiniCssExtractPlugin({
	filename: "[name].css"
});

//copy static resources to the build directory
const copyStatic = new CopyWebpackPlugin([
	'static/',
]);

// tell it what file to starting compiling on and what to call it when done
const config = {
	entry: {
		app: APP_DIR + '/App/App.js',
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
				}
			}
		}
	},
	module : {
		rules : [
			// use babel loader
			{
				test : /\.jsx?$/,
				include : APP_DIR,
				loader : 'babel-loader'
			},
			{
				test : /\.jsx?$/,
				include : /dts.*\.jsx?$/,
				loader : 'babel-loader'
			},
			// SCSS and Single CSS file magic
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							url: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							fallback: 'file-loader',
							name: '[name].[ext]',
							outputPath: 'img/',
							emitFile: false,
						}
					}
				]
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: 'raw-loader'
					}
				]
			}
		]
	},
	plugins: [
		cssExtract,
		copyStatic,
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		//fix a bug in react-select that was finding two instances of react in each node_modules
		alias: { 'react': path.resolve(__dirname, 'node_modules', 'react') }
	},
};

module.exports = config;
