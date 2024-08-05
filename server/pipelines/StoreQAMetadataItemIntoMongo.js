"use strict";

const QAMetadataItem = require("../models/QAMetadataItem");

class StoreQAMetadataItemIntoMongo {
  constructor(mongoDB) {
    this.mongoDB = mongoDB; // Keeping the MongoDB class for connection management
  }

  async process(ownerId, contentId, chunkId, chunkIndex, prompt, usage) {
    try {
      // Save the content documents using Mongoose

      return new QAMetadataItem({
        ownerId,
        contentId,
        chunkId,
        chunkIndex,
        prompt,
        usage
      }).save();
    } catch (error) {
      console.error("Error registering qa items metadata into MongoDB:", error);
      return null;
    }
  }
}

module.exports = StoreQAMetadataItemIntoMongo;
