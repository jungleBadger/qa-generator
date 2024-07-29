"use strict";

const mongoClient = require("../helpers/mongodb");

class storeQAItemsIntoMongo {
  constructor() {}

  process(chunk) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          mongoId: "xxx",
          context: "chunk",
          chunk: chunk
        });
      }, 100);
    });
  }
}

module.exports = storeQAItemsIntoMongo;
