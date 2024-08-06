"use strict";

const contentHelper = require("../helpers/content");

class RegisterContent {
  constructor(mongoDB) {
    this.mongoDB = mongoDB; // Still keeping the MongoDB class for connection management
  }

  async process(ownerId) {
    // Create a new content document using the Mongoose model
    const contentData = {
      ownerId: ownerId // Set default or custom owner value if needed
    };

    try {
      // Save the content document using Mongoose

      const result = await contentHelper.createContent(contentData);

      return result ? result : null;
    } catch (error) {
      console.error("Error registering content into MongoDB:", error);
      return null;
    }
  }
}

module.exports = RegisterContent;
