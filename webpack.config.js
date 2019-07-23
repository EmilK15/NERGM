const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './client/components/app.js'
    },
    output: {
        filename: './build/bundle.js',
        sourceMapFilename: './build/bundle.map'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./views/index.html",
            filename: "./views/index.html"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
                },
                default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
                }
            }
        }
    }
};