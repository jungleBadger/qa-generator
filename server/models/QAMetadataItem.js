"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DB_COLLECTION_NAME = "qaMetadataItems";

// Define a Mongoose schema for the Chunk model
const qaMetadataItemSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID for _id
  ownerId: { type: String, required: true },
  contentId: { type: String, required: true },
  chunkId: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  prompt: { type: Object, required: true },
  usage: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create and export the Mongoose model
const QAMetadataItem = mongoose.model(DB_COLLECTION_NAME, qaMetadataItemSchema);

module.exports = QAMetadataItem;
