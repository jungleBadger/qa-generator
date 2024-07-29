"use strict";

const Chunk = require("../models/Chunk");
const DB_COLLECTION_NAME = "contentChunks";

class StoreChunkIntoMongo {
  constructor(mongoDB) {
    this.mongoDB = mongoDB;
    this.collectionName = DB_COLLECTION_NAME;
  }

  async process(contentId, chunkObject) {
    const chunk = new Chunk(contentId, chunkObject);
    const result = await this.mongoDB.insertOne(
        this.collectionName,
        chunk
    );

    return result ? chunk : null;
  }
}
module.exports = StoreChunkIntoMongo;
