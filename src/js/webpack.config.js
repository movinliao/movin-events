var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        "index.android": "./exports/index.android.js",
		"index.ios": "./exports/index.ios.js"
    },
    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
        library: 'yyapi',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: { comments: false },
        })
    ],
};
