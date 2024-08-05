"use strict";

const OpenAI = require("openai");

const DEFAULT_MODEL = require("../configs/llmModel");

class Inference {
  constructor(inferenceModel = DEFAULT_MODEL) {
    this.client = null;
    this.inferenceModel = inferenceModel;
  }

  connect(apiKey) {
    this.client = new OpenAI({
      apiKey: apiKey
    });
  }

  async execute(messagesArray = [], messageOptions = {}) {
    return this.client.chat.completions.create({
      messages: messagesArray,
      model: this.inferenceModel,
      ...messageOptions
    });
  }

  createPromptMessage(prompt) {
    return {
      role: "user",
      content: prompt
    };
  }
}

module.exports = Inference;
