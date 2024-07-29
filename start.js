"use strict";

require("dotenv").config();

(async function (createApp, logger, MongoDB, Inference, serverConfigs) {
  const mongoDB = new MongoDB();
  const inference = new Inference();

  const app = await createApp(logger, mongoDB, inference);

  app.listen({ host: serverConfigs.host, port: serverConfigs.port }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });

  module.exports = app;
})(
  require("./server/app"),
  require("./server/helpers/logger"),
  require("./server/helpers/MongoDB"),
  require("./server/helpers/Inference"),
  require("./server/configs/server.js")
);
