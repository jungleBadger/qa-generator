"use strict";

require("dotenv").config();

(async function (
  createApp,
  Orchestrator,
  logger,
  passport,
  MongoDB,
  Inference,
  serverConfigs
) {
  const mongoDB = new MongoDB();
  const inference = new Inference();

  const app = await createApp(
    logger,
    Orchestrator,
    passport,
    mongoDB,
    inference
  );

  await app.listen(
    { host: serverConfigs.host, port: serverConfigs.port },
    (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );

  module.exports = app;
})(
  require("./server/app"),
  require("./server/pipelines/Orchestrator"),
  require("./server/helpers/logger"),
  require("./server/helpers/passport"),
  require("./server/factories/MongoDB"),
  require("./server/factories/Inference"),
  require("./server/configs/server.js")
);
