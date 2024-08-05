"use strict";

const RegisterContent = require("./RegisterContent");
const SplitTextIntoChunks = require("./SplitTextIntoChunks");
const StoreChunkIntoMongo = require("./StoreChunkIntoMongo");
const GenerateQA = require("./generateQA");
const StoreQAItemsIntoMongo = require("./storeQAItemsIntoMongo");
const StoreQAMetadataItemIntoMongo = require("./StoreQAMetadataItemIntoMongo");

class Orchestrator {
  constructor(logger, mongoDB, inference) {
    this.logger = logger || console;
    this.registerContent = new RegisterContent(mongoDB);
    this.storeChunkIntoMongo = new StoreChunkIntoMongo(mongoDB);
    this.generateQA = new GenerateQA(inference);
    this.storeQAItemsIntoMongo = new StoreQAItemsIntoMongo(mongoDB);
    this.storeQAMetadataItemIntoMongo = new StoreQAMetadataItemIntoMongo(
      mongoDB
    );

    this.contentObject = "";
  }

  _logStart() {
    this.logger.info(
      `Started text processing orchestration for the content: ${this.contentObject._id}`
    );
  }

  _logEnd() {
    this.logger.info(
      `Finished text processing orchestration for the content: ${this.contentObject._id}`
    );
  }

  process(documentText, documentOwner) {
    return new Promise(async (resolve, reject) => {
      if (!documentText) {
        return reject("Missing document text");
      }

      try {
        const textSplitter = new SplitTextIntoChunks();
        const promises = [];

        this.contentObject = await this.registerContent.process(documentOwner);
        this._logStart();

        textSplitter.on("data", async (chunkObject) => {
          promises.push(
            (async () => {
              try {
                const [storedChunk, qaItems] = await Promise.all([
                  this.storeChunkIntoMongo.process(
                    documentOwner,
                    this.contentObject._id,
                    chunkObject
                  ),
                  this.generateQA.process(chunkObject)
                ]);

                const [storedQAItems, storedQAMetadataItem] = await Promise.all(
                  [
                    this.storeQAItemsIntoMongo.process(
                      documentOwner,
                      this.contentObject._id,
                      storedChunk._id,
                      storedChunk.index,
                      qaItems.content
                    ),
                    this.storeQAMetadataItemIntoMongo.process(
                      documentOwner,
                      this.contentObject._id,
                      storedChunk._id,
                      storedChunk.index,
                      qaItems.prompt,
                      qaItems.usage
                    )
                  ]
                );

                return {
                  chunk: storedChunk,
                  qaItems: storedQAItems,
                  metadata: storedQAMetadataItem
                };
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
            resolve({
              content: this.contentObject,
              data: result
            });
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
