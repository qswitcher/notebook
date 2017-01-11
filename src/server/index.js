import path from 'path';
import Express from 'express';
import tasks from './tasks/router';

export default function() {
    const app = new Express();

    const indexPath = path.join(__dirname, '../index.html');
    const publicPath = Express.static(path.join(__dirname, '../../dist'));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    // endpoints
    app.use('/api/tasks', tasks);

    app.use('/dist', publicPath);

    app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
}
