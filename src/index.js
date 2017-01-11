import Server from './server';

const app = Server();
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        publicPath: config.output.publicPathdist,
            stats: {
           colors: true
       },
    }));

}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
