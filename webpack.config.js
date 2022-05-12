const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	mode: 'production',
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	node: false,
	// optimization: {
	// 	minimize: false,
	// },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	devtool: 'inline-cheap-module-source-map',
};
