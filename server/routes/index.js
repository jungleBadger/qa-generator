"use strict";

const mainAuthRoutes = require("./auth/main");
const mainStaticRoutes = require("./static/main");
const mainAPIRoutes = require("./api/main");

module.exports = {
  init: async function (app, Orchestrator, passport, mongoDB, inference) {
    const orchestrator = new Orchestrator(app.log, mongoDB, inference);

    mainAuthRoutes.init(app, passport);
    mainStaticRoutes.init(app, passport);
    mainAPIRoutes.init(app, passport, orchestrator);

    app.log.info("Routes initialized");
  }
};
