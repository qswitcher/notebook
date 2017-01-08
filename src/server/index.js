import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';

const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// universal routing
app.get('*', (req, res) => {
    match(
        { routes, location: req.url },
        (err, redirectLocation, renderProps) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (redirectLocation) {
                return res.redirect(302, redirectLocation);
            }

            let markup;
            if (renderProps) {
                markup = renderToString(<RouterContext {...renderProps}/>);
            } else {
                res.status(404);
            }

            return res.sender('index', { markup });
        }
    )
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
