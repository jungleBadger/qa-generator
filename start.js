const dotenv = require("dotenv");
const path = require("path");
const createApp = require("./server/app");
const fastifyStatic = require("@fastify/static");
const pino = require("pino");

// Load environment variables
dotenv.config();

const host = process.env.APP_HOST || "0.0.0.0";
const port = process.env.APP_PORT || 3000;
const debug = process.env.DEBUG === "true";

const logger = pino({
  level: debug ? "debug" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
      ignore: "pid,hostname"
    }
  }
});

const app = createApp({ logger });

app.register(fastifyStatic, {
  root: path.join(__dirname, "/client/user_module/dist"),
  prefix: "/app", // optional: default '/'
  decorateReply: true // Do not decorate the reply interface
});

// Serve the index.html file
app.get("/app", (request, reply) => {
  reply.sendFile(
    "index.html",
    path.join(__dirname, "/client/user_module/dist")
  ); // serving the index.html from user_module/dist
});


// Start the server with the new method
app.listen({ port, host }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
