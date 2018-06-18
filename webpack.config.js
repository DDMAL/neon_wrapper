var path = require('path');
var webpack = require('webpack');

module.exports = [{
    entry: {
        'Neon': './Neon2/static/src/Neon.js'
    },
    output: {
        filename: 'Neon.js',
        path: __dirname + '/static/src/'
    },
    plugins: 
        [new webpack.ProvidePlugin({
            neon: 'Neon'
    })]
},{
    entry: {
        'Controls': './Neon2/static/src/Controls.js',
        'InfoBox': './Neon2/static/src/InfoBox.js',
        'ZoomHandler': './Neon2/static/src/ZoomHandler.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/static/src/'
    }
},{
    entry: {
        'd3': './Neon2/static/js/d3.js',
        'jquery': './Neon2/static/js/jquery.js',
        'verovio-toolkit': './Neon2/static/js/verovio-toolkit.js',
        'bulma-slider.min': './Neon2/static/js/bulma-slider.min.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/static/js/'
    },
    node: {
        fs: 'empty'
    }
},{
    entry: {
        'bulma-slider.min': './Neon2/static/css/bulma-slider.min.css',
        'style': './Neon2/static/css/style.css'
    },
    output: {
        filename: '[name].css',
        path: __dirname + '/static/css/'
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            }
        ]
    }
}];