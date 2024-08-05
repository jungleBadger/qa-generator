"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DB_COLLECTION_NAME = "qaItems";

// Define a Mongoose schema for the Chunk model
const qaItemSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID for _id
  ownerId: { type: String, required: true },
  contentId: { type: String, required: true },
  chunkId: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  index: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create and export the Mongoose model
const QAItem = mongoose.model(DB_COLLECTION_NAME, qaItemSchema);

module.exports = QAItem;
