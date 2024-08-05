"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DB_COLLECTION_NAME = "contents";

// Define a Mongoose schema for the Content model
const contentSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID for _id
  ownerId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now } // Automatically set timestamp
});

// Create and export the Mongoose model
const Content = mongoose.model(DB_COLLECTION_NAME, contentSchema);

module.exports = Content;
