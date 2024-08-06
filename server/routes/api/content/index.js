"use strict";

const contentHelper = require("../../../helpers/content");


module.exports = {
    init: function (app, passport, orchestrator) {
        app.log.info("Initializing API routes");

        // Define routes
        app.get("/api/content/create", passport.middlewares.ensureAuthAPI, async (req, res) => {
            const data = await req.file(); // Fastify-multipart file handler
            const fields = data.fields; // Non-file fields

            // Extract text input and file data
            const userInputText = fields.textInput.value;

            return await orchestrator.process(
                userInputText,
                req.user._id,
                data
            );
        });

        app.get("/api/content/list", passport.middlewares.ensureAuthAPI, async (req, res) => {
            return await contentHelper.listContentByOwner(req.user._id);
        });

        return app;
    }
};
