"use strict";

const QAItem = require("../models/QAItem");

class StoreQAItemsIntoMongo {
  constructor(mongoDB) {
    this.mongoDB = mongoDB; // Keeping the MongoDB class for connection management
  }

  async process(ownerId, contentId, chunkId, chunkIndex, qaItems) {
    try {
      // Save the content documents using Mongoose

      return QAItem.insertMany(
        qaItems.map((qaItem, index) => ({
          ownerId,
          contentId,
          chunkId,
          chunkIndex,
          index,
          ...qaItem
        })),
        { ordered: true }
      );
    } catch (error) {
      console.error("Error registering qa items into MongoDB:", error);
      return null;
    }
  }
}

module.exports = StoreQAItemsIntoMongo;
