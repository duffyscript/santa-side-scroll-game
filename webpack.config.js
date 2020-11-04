// const webpack = require('webpack'); //to access built-in plugins
// var path = require('path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const modeDevelopmentOn = mode === 'development';
const modeProductionOn = !modeDevelopmentOn;

const config = {
    entry: "./src/index.ts",
    output: {
        path: __dirname + '/dist',
        filename: "main.js",
        publicPath: "dist/"
    },
    devtool: 'inline-source-map',
    plugins: [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devServer: {
        host: 'localhost',
        publicPath: '/dist/',
        // contentBase: './',
        watchContentBase: true,
        compress: true,
        port: 9001
    },
    mode: mode
};

if (modeDevelopmentOn) {
    config.devtool = 'source-map';
}

if (modeProductionOn) {
    config.module.rules.push({
        use: "babel-loader",
        test: /\.js$/
    });
}

module.exports = config;