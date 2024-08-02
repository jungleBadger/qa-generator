"use strict";

const fastify = require("fastify");
const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");
const MemoryStore = require("memorystore")(fastifySession);

const openaiConfigs = require("./configs/openai");
const mongodbConfigs = require("./configs/mongodb");
const routes = require("./routes");
const passport = require("./helpers/passport");

async function createApp(logger, mongoDB, inference) {
    const app = fastify({
        logger,
    });

    // Register cookie and session plugins
    app.register(fastifyCookie);
    app.register(fastifySession, {
        secret: process.env.APP_SECRET, // Ensure this is defined in your environment
        cookie: { secure: false }, // Set secure to true if using HTTPS
        store: new MemoryStore({ checkPeriod: 86400000 }), // Memory store for sessions
        saveUninitialized: false,
        resave: false,
    });

    // Initialize Passport.js
    app.register(passport.handler.initialize());
    app.register(passport.handler.secureSession());


    app.get('/auth',
        {
            preValidation: passport.handler.authenticate(
                'auth0',
                { scope: "openid email profile"}
            )
        },
        (req, res) => {
            console.log('ok');
            console.log(req.url)
        }
    )

    app.get('/callback',
        {
            preValidation: passport.handler.authenticate(
                'auth0',
                { scope: "openid email profile"}
            )
        },
        function(req, res) {
            console.log('callback');
            console.log("RETRIEVING ORIGINAL URL:", req.session.originalUrl )
            res.redirect("/");

        }
    )

    app.get('/auth/view', function(req, res) {
        if (!req.user) {
            res.redirect(`/auth?originalUrl=${req.originalUrl}`);
        } else {
            res.send(req.user);

        }
    })

    app.get('/auth/api', function(req, res) {

        if (!req.user) {
            res.status(401).send("Unauthorized");
        } else {
            res.send(req.user);

        }
    })

    await mongoDB.connect(mongodbConfigs.uri, mongodbConfigs.db);
    inference.connect(openaiConfigs.apiKey);

    routes.init(app, mongoDB, inference);

    return app;
}

module.exports = createApp;
