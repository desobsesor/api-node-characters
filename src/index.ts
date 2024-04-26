import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { resolvers, typeDefs } from "./helpers/graphql";

// Logger
import "./helpers/loggers";

// CronJob
import { myCronJob } from "./helpers/cronJob";
myCronJob.stop();

//Server app
const app: any = express();

app.use(bodyParser.json());
app.use(cors());

// Add EJS

app.set("view engine", "ejs");
app.use(express.static("views"));

// Add logger utils
app.use(loggerMiddleware);

// Start server Apollo for redis
const server = new ApolloServer({ typeDefs, resolvers });
(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

// Routers
app.use("/", require("./routes/jsonwebtoken"));
app.use("/", require("./routes/character"));
app.use("/", require("./routes/swagger"));

/*
app.get('/', (req: any, res: any) => {
  res.send('API for search service with cache and character management.');
});
*/

// Define a route for the root endpoint ('/')
app.get("/", (req: any, res: any) => {
  // Render the EJS template and send the HTML response
  res.render("index", { message: "Welcome to your Node.js Express API!" });
});

// Starting server
const PORT = Number(process.env.PORT) || 4000;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server with GraphQL running at ${HOSTNAME}:${PORT}`);
});
