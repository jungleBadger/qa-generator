"use strict";

const fastify = require("fastify");

const MongoStore = require("connect-mongo");

const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");

const openaiConfigs = require("./configs/openai");
const mongodbConfigs = require("./configs/mongodb");
const routes = require("./routes");

async function createApp(logger, Orchestrator, passport, mongoDB, inference) {
  const app = await fastify({
    logger
  });

  // Register cookie and session plugins
  await Promise.all([
    app.register(fastifyCookie),
    app.register(fastifySession, {
      secret: process.env.APP_SECRET,
      store: new MongoStore({
        mongoUrl: mongodbConfigs.uri
      }),
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      }
    }),
    app.register(passport.handler.initialize()),
    app.register(passport.handler.secureSession())
  ]);

  await Promise.all([
    mongoDB.connect(mongodbConfigs.uri),
    inference.connect(openaiConfigs.apiKey)
  ]);

  await routes.init(app, Orchestrator, passport, mongoDB, inference);

  return app;
}

module.exports = createApp;
