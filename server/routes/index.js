"use strict";

const mainStaticRoutes = require("./static/main");
const mainAPIRoutes = require("./api/main");

const Orchestrator = require("../pipelines/Orchestrator");

module.exports = {
  init: function (app, mongoDB, inference) {

    const orchestrator = new Orchestrator(app.log, mongoDB, inference);

    mainStaticRoutes.init(app);
    mainAPIRoutes.init(app, orchestrator);

    app.log.info("Routes initialized");
  }
};
