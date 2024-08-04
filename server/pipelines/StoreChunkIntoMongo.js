"use strict";

const Chunk = require("../models/Chunk");

class StoreChunkIntoMongo {
  constructor(mongoDB) {
    this.mongoDB = mongoDB;
  }

  async process(contentId, chunkObject) {
    const chunkData = {
      contentId,
      index: chunkObject.index,
      text: chunkObject.text,
      tokenAmount: chunkObject.tokenAmount
    };

    try {
      // Save the chunk document using Mongoose
      const chunk = new Chunk(chunkData);
      const result = await chunk.save();

      return result ? chunk : null;
    } catch (error) {
      console.error("Error storing chunk into MongoDB:", error);
      return null;
    }
  }
}
module.exports = StoreChunkIntoMongo;
