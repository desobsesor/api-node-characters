// routes/competencias.js
import express from "express";
const router = express.Router();

import fs from "fs";
import YAML from "yaml";

import swaggerUi from "swagger-ui-express";
// import { autenticacion } from '../middlewares/autenticacion';

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

router.use(
  "/api-docs" /*, autenticacion */,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

module.exports = router;
