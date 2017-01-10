import path from 'path';
import { Server } from 'http';
import Express from 'express';
import tasks from './tasks/router';

const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// endpoints
app.use('/api/tasks', tasks);

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
