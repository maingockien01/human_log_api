import express from 'express';
import { router } from './app';
import './database';
import * as bodyParser from 'body-parser'
import { errorHandler } from './core/middlewares/error.handler.middleware';

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (_, res) => {
  res.status(200).send('Hello word')
})

app.use('/', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Running on port ${port}`));

// //For testing
// test();