import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createCronJob } from './utils/cronJob';
import { loggerMiddleware } from './middlewares/loggerMiddleware';

// CronJob
const myCronJob = createCronJob('* * 12 * * *'); // Cron expression for every 12 hours
myCronJob.start();

// Logger
import './helpers/loggers';
import { resolvers, typeDefs } from './helpers/graphql';

const app: any = express();

app.use(bodyParser.json());
app.use(cors());

// Add logger utils
app.use(loggerMiddleware);

// Start server Apollo for redis
const server = new ApolloServer({ typeDefs, resolvers });
(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

// Routers
app.use('/', require('./routes/jsonwebtoken'));
app.use('/', require('./routes/character'));
app.use('/', require('./routes/swagger'));

app.get('/', (req: any, res: any) => {
  res.send('API for search service with cache and character management.');
});


// Starting server
const PORT = Number(process.env.PORT) || 4000;
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server with GraphQL running at ${HOSTNAME}:${PORT}`);
});