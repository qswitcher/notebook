const app = require('./server/app');
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);

    const history = require('connect-history-api-fallback');

    const devMiddleware = webpackDevMiddleware(compiler, {
        noInfo: false,
        publicPath: config.output.publicPath,
        historyApiFallback: true,
        stats: {
           colors: true
       },
   });

    app.use(devMiddleware);
    app.use(history());
    app.use(webpackHotMiddleware(compiler));
    app.use(devMiddleware);
} else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`);
