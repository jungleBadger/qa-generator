"use strict";

module.exports = {
  init: function (app, passport) {
    app.log.info("Initializing Auth routes");

    app.get("/auth/login", passport.middlewares.login, (req, res) => {
      console.log("ok");
      console.log(req.url);
    });

    app.get(
      "/auth/callback",
      passport.middlewares.callback,
      function (req, res) {
        console.log("callback");
        console.log("RETRIEVING ORIGINAL URL:", req.session.originalUrl);
      }
    );

    app.get("/auth/profile", (req, res) => {
      return req.user || {};
    });

    app.all("/auth/logout", async function (req, res, next) {
      await req.logout();
      return res.redirect("/auth/login");
    });

    return app;
  }
};
