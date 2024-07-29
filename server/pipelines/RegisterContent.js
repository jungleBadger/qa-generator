"use strict";

const Content = require("../models/Content");
const DB_COLLECTION_NAME = "contents";

class RegisterContent {
  constructor(mongoDB) {
    this.mongoDB = mongoDB;
    this.collectionName = DB_COLLECTION_NAME;
  }

  async process() {
    const content = new Content();
    const result = await this.mongoDB.insertOne(this.collectionName, content);

    return result ? content : null;
  }
}

module.exports = RegisterContent;
