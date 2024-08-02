"use strict";

const Auth0Strategy = require("passport-auth0");
const fastifyPassport = require("@fastify/passport");

fastifyPassport.use(
    "auth0",
    new Auth0Strategy(
        {
            domain: "dev-fomzpb31hz3aa8jm.us.auth0.com",
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: "/callback"
        },
        function (accessToken, refreshToken, extraParams, profile, done) {
            console.log("Auth0 Strategy Handler:");
            console.log("AccessToken:", accessToken);
            console.log("RefreshToken:", refreshToken);
            console.log("ExtraParams:", extraParams);
            console.log("Profile:", profile);
            done(null, profile); // Pass the profile object or relevant data
        }
    )
);

// Serialize the user object into the session
fastifyPassport.registerUserSerializer(async (user, request) => {
    return user; // Serialize an identifier or entire user object
});

// Deserialize the user object from the session
fastifyPassport.registerUserDeserializer(async (user, request) => {
    return user; // Retrieve the user object from session data
});


module.exports = {
    handler: fastifyPassport,
    middlewares: {
        ensureAuth: {
            preValidation: fastifyPassport.authenticate("auth0", {
                successRedirect: "/", // Redirect after successful authentication
                failureRedirect: "/auth/failure", // Redirect if authentication fails
                scope: "openid email profile", // Ensure correct scopes are requested
            }),
        },
    },
};
