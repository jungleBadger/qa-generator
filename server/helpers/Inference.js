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

  async execute(messagesArray = []) {
    const completion = await this.client.chat.completions.create({
      messages: messagesArray,
      model: this.inferenceModel
    });

    console.log(completion.choices[0]);

    return completion;
  }
}

module.exports = Inference;
