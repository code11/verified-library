var webpack = require("webpack");

module.exports = {
	entry: {
		core  : "./src/lib/core/@main.js",
		bankid_se: "./src/lib/bankid/se/@main.se.js"
	},
	output: {
		path: './dist/anticimex',
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
	}
};
