"use strict";

const RegisterContent = require("./RegisterContent");
const SplitTextIntoChunks = require("./SplitTextIntoChunks");
const StoreChunkIntoMongo = require("./StoreChunkIntoMongo");
const GenerateQA = require("./generateQA");
const storeQAItemsIntoMongo = require("./storeQAItemsIntoMongo");

class Orchestrator {
  constructor(logger, mongoDB, inference) {
    this.logger = logger || console;
    this.registerContent = new RegisterContent(mongoDB);
    this.storeChunkIntoMongo = new StoreChunkIntoMongo(mongoDB);
    this.generateQA = new GenerateQA(inference);
    this.storeQAItemsIntoMongo = new storeQAItemsIntoMongo(mongoDB);

    this.contentObject = "";
  }

  _logStart() {
    this.logger.info(`Starting text processing orchestration for the content: ${this.contentObject._id}`);
  }

  _logEnd() {
    this.logger.info(`Finishing text processing orchestration for the content: ${this.contentObject._id}`);
  }

  process(documentText) {
    return new Promise(async (resolve, reject) => {
      if (!documentText) {
        return reject("Missing document text");
      }

      try {
        const textSplitter = new SplitTextIntoChunks();
        const promises = [];

        this.contentObject = await this.registerContent.process();
        this._logStart();


        textSplitter.on("data", async (chunkObject) => {
          promises.push(
              (async () => {
                try {
                  const [storedChunk, qaItems] = await Promise.all([
                    this.storeChunkIntoMongo.process(this.contentObject._id, chunkObject),
                    this.generateQA.process(chunkObject)
                  ]);

                  await this.storeQAItemsIntoMongo.process(qaItems);

                  return { chunk: storedChunk, qaItems };
                } catch (e) {
                  throw e;
                }
              })()
          );
        });

        textSplitter.on("end", async () => {
          try {
            const result = await Promise.all(promises);
            this._logEnd();
            resolve(
                {
                  "content": this.contentObject,
                  "data": result
                }
            );
          } catch (e) {
            reject(e);
          }
        });

        textSplitter.on("error", (err) => {
          reject(err);
        });

        textSplitter.process(documentText);

      } catch (err) {
        reject(err);
      }

    });
  }
}

module.exports = Orchestrator;
