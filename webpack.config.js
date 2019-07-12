const path = require("path");

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
            }
        ]
    },
    externals: {
        'verovio-dev': 'verovio',
        jquery: 'jQuery',
        d3: 'd3'
    }
};
