"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DB_COLLECTION_NAME = "contentChunks";

// Define a Mongoose schema for the Chunk model
const chunkSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID for _id
  contentId: { type: String, required: true },
  index: { type: Number, required: true },
  text: { type: String, required: true },
  tokenAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create and export the Mongoose model
const Chunk = mongoose.model(DB_COLLECTION_NAME, chunkSchema);

module.exports = Chunk;
