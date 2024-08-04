"use strict";

const Auth0Strategy = require("passport-auth0");
const fastifyPassport = require("@fastify/passport");
const userHelper = require("../helpers/user"); // Import the user helper

fastifyPassport.use(
  "auth0",
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    async function (accessToken, refreshToken, extraParams, profile, done) {
      try {
        // Find the user by profile ID
        let user = await userHelper.findUserByProfileId(profile.id);

        if (!user) {
          // Create a new user if not found
          user = await userHelper.createUser(profile);
        } else {
          // Update the user if found
          const updatedName = profile.displayName || profile.name || "";
          if (user.owner !== updatedName) {
            user.owner = updatedName;
            await userHelper.updateUser(user._id, { owner: user.owner });
          }
        }

        // Pass the user object to the done callback
        done(null, user);
      } catch (error) {
        console.error("Error in Auth0 strategy handler:", error);
        done(error);
      }
    }
  )
);

// Serialize the user object into the session
fastifyPassport.registerUserSerializer(async (user, request) => {
  return user._id; // Serialize the user ID into the session
});

// Deserialize the user object from the session
fastifyPassport.registerUserDeserializer(async (userId, request) => {
  // Retrieve the user from the database using the ID
  return await userHelper.findUser(userId);
});

module.exports = {
  handler: fastifyPassport,
  middlewares: {
    login: {
      preValidation: fastifyPassport.authenticate("auth0", {
        scope: "openid email profile"
      })
    },
    callback: {
      preValidation: fastifyPassport.authenticate("auth0", {
        scope: "openid email profile",
        successRedirect: "/",
        failureRedirect: "/login"
      })
    },
    ensureAuth: {
      preValidation: (req, res, done) => {
        if (!req.user) {
          return res.redirect(`/auth/login?originalUrl=${req.originalUrl}`);
        }
        return done();
      }
    },
    ensureAuthAPI: {
      preValidation: (req, res, done) => {
        if (!req.user) {
          return res.status(401).send("Unauthorized");
        }
        return done();
      }
    }
  }
};
