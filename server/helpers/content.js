"use strict";

const Content = require("../models/Content");

async function createContent(contentObject) {
  try {
    const newContent = new Content(contentObject);

    const savedContent = await newContent.save();
    console.log("Content created:", savedContent);
    return savedContent;
  } catch (error) {
    console.error("Error creating content:", error);
    throw error;
  }
}

async function listContentByOwner(ownerId) {
  try {
    return await Content.find({
      "ownerId": ownerId
    });
  } catch (error) {
    console.error("Error getting content:", error);
    throw error;
  }
}


module.exports = {
  createContent,
  listContentByOwner
};
