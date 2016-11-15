module.exports = {
    entry: "./src/lib/@main.js",
    output: {
        path: './dist/anticimex',
        filename: "ve.bundle.js",
        libraryTarget: 'var',
        library: "VeLib"
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
