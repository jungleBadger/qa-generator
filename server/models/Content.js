"use strict";

const { v4: uuidv4 } = require("uuid");

class Content {
  constructor() {
    this._id = uuidv4();
    this.owner = "";
    this.timestamp = new Date();
  }
}

module.exports = Content;
