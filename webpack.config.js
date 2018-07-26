const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: {
        editor: "./editor.js",
        pretty: "./Neon2/src/pretty.js"
    },
    output: {
        path: path.resolve(__dirname, "static"),
        filename: "[name].js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            d3: 'd3',
            $: 'jquery'
        })
    ],
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./img/"
                        }
                    }
                ]
            }
        ]
    }
};
