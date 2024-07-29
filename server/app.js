"use strict";

const fastify = require("fastify");

const openaiConfigs = require("./configs/openai");
const mongodbConfigs = require("./configs/mongodb");
const routes = require("./routes");

async function createApp(logger, mongoDB, inference) {
  const app = fastify({
    logger
  });

  await mongoDB.connect(mongodbConfigs.uri, mongodbConfigs.db);
  inference.connect(openaiConfigs.apiKey);

  routes.init(app, mongoDB, inference);

  return app;
}

module.exports = createApp;
