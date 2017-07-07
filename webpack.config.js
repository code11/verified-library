var webpack = require( "webpack" );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' )
var version = require("./package.json").version

module.exports = {
	entry: {
		core: "./src/lib/core/@main.js",
		public_templates: "./src/lib/public_templates/@main.js",
		bisnode: "./src/lib/bisnode/@main.js",
		id_rights: "./src/lib/id_rights/@main.js"
	},
	output: {
		path: './dist/' + version + "/",
		filename: "ve.[name].js" 	,
		libraryTarget: 'umd',
		library: [ "VeLib", "[name]" ]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a valid name to reference
				query: {
					presets: [ 'es2015' ]
				}
			}
		]
	},
	plugins: [new webpack.DefinePlugin({
			VERSION: version
		})],
	devtool: "source-map"
};
