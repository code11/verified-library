var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		core  : "./src/lib/core/@main.js",
		public_templates: "./src/lib/public_templates/@main.js"
	},
	output: {
		path: './dist/dev',
		filename: "ve.[name].js",
		libraryTarget: 'umd',
		library: ["VeLib", "[name]"]
	},
	module: {
		loaders: [
		  {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a valid name to reference
			query: {
			  presets: ['es2015']
			}
		  }
		]
	},
	plugins:[
		new CopyWebpackPlugin([
			{
				from: {
					glob: './dist/dev/**',
					dot: true
				},
				to: './../../@test_templates/'
			}
		])
	]
};
