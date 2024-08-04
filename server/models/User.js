"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DB_COLLECTION_NAME = "users";

// Define a Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID for _id
  owner: { type: String, default: "" }, // Default owner as an empty string
  timestamp: { type: Date, default: Date.now } // Automatically set timestamp
});

// Create and export the Mongoose model
const User = mongoose.model(DB_COLLECTION_NAME, userSchema);

module.exports = User;
