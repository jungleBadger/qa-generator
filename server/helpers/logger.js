"use strict";

const pino = require("pino");

module.exports = pino({
  level: process.env.DEBUG === "true" ? "debug" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
      ignore: "pid,hostname"
    }
  }
});
