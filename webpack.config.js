const path = require("path");
const webpack = require("webpack");
const childProcess = require('child_process');

let commitHash = childProcess.execSync('(cd Neon && git rev-parse --short HEAD)').toString();

module.exports = {
    mode: "production",
    entry: {
        editor: "./editor.js",
        pretty: "./Neon/src/pretty.js"
    },
    output: {
        path: path.resolve(__dirname, "static"),
        filename: "[name].js"
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            },
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
            },
            {
                test: /\.rng$/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /Worker\.js/,
                use: [
                    'worker-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            }
        ]
    },
    externals: {
        'verovio-dev': 'verovio',
        d3: 'd3'
    },
    plugins: [
        new webpack.DefinePlugin({
            __LINK_LOCATION__: JSON.stringify('#'),
            __NEON_VERSION__: JSON.stringify('Commit ' + commitHash)
        })
    ]
};
