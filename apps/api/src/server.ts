import { json, urlencoded } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';
import meals from './routes/meals/meals';

config();

const URI = process.env.URI ?? '';
const mongoClient = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createServer = () => {
  const app = express();

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/api/healthz', (req, res) => {
      return res.json({ ok: true });
    });

  app.use('/api/meals', meals);

  return app;
};
