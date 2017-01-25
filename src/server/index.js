import path from 'path';
import Express from 'express';
import tasks from './tasks/router';
import bodyParser from 'body-parser';
import connect from './db';

export default function(db) {
    const app = new Express();

    // const indexPath = path.join(__dirname, '../../dist/index.html');
    // const publicPath = Express.static(path.join(__dirname, '../../dist'));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use(bodyParser.json());

    // endpoints
    app.use('/api/tasks', tasks(db));

    // app.use('/dist', publicPath);

    // app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
}
