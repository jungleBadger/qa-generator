"use strict";

const mainAuthRoutes = require("./auth/main");
const mainStaticRoutes = require("./static/main");
const contentAPIRoutes = require("./api/content/index");

module.exports = {
  init: async function (app, orchestrator, passport) {
    mainAuthRoutes.init(app, passport);
    mainStaticRoutes.init(app, passport);
    contentAPIRoutes.init(app, passport, orchestrator);

    app.log.info("Routes initialized");
  }
};
