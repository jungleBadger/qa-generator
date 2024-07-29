"use strict";

const { v4: uuidv4 } = require("uuid");

class Chunk {
  constructor(contentId, chunkData) {
    this._id = uuidv4();
    this.contentId = contentId;
    this.index = chunkData.index;
    this.text = chunkData.text;
    this.tokenAmount = chunkData.tokenAmount;
    this.timestamp = new Date();
  }
}

module.exports = Chunk;
