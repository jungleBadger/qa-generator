"use strict";

require("dotenv").config();

const Auth0Strategy = require('passport-auth0');
const fastifyPassport = require('@fastify/passport');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');

(async function (createApp, logger, MongoDB, Inference, serverConfigs) {
    const mongoDB = new MongoDB();
    const inference = new Inference();

    const app = await createApp(logger, mongoDB, inference);
    app.register(fastifyCookie);
    app.register(fastifySession, {
        secret: process.env.APP_SECRET,
        cookie: { secure: false }, // Set secure to false for HTTP
        saveUninitialized: false,
        resave: false,
    });

    app.register(fastifyPassport.initialize());
    app.register(fastifyPassport.secureSession());

    fastifyPassport.use('auth0', new Auth0Strategy({
            domain: 'dev-fomzpb31hz3aa8jm.us.auth0.com',
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: 'http://localhost:4025/callback'
        },
        function(accessToken, refreshToken, extraParams, profile, done) {
            console.log("Auth0 Strategy Handler:");
            console.log("AccessToken:", accessToken);
            console.log("RefreshToken:", refreshToken);
            console.log("ExtraParams:", extraParams);
            console.log("Profile:", profile);
            done(null, profile);
        }
    ));

    fastifyPassport.registerUserSerializer(async (user, request) => {
        return user;
    });

    fastifyPassport.registerUserDeserializer(async (user, request) => {
        return user;
    });

    app.all('/login',
        { preValidation: fastifyPassport.authenticate('auth0', { scope: 'openid email profile' }) },
        function(req, res) {
            res.redirect('/');
        }
    );

    app.get('/callback',
        { preValidation: fastifyPassport.authenticate('auth0', { failureRedirect: '/x', failureMessage: true }) },
        async (request, reply) => {
            console.log("Callback Handler:");
            if (request.isAuthenticated()) {
                console.log(`Authenticated User: ${request.user}`);
                reply.redirect('/');
            } else {
                console.log('Authentication failed');
                reply.redirect('/x');
            }
        }
    );

    await app.listen({ host: serverConfigs.host, port: serverConfigs.port }, (err) => {
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
