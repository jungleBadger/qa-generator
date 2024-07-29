"use strict";

const EventEmitter = require("events");
const { encoding_for_model } = require("tiktoken");

const textSplitterConfigs = require("../configs/textSplitter");

const CHUNK_SIZE = textSplitterConfigs.chunkSize;
const OVERLAP_TOKENS = textSplitterConfigs.overlapTokens;
const DEFAULT_MODEL = require("../configs/llmModel");

class SplitTextIntoChunks extends EventEmitter {
  constructor(
    chunkSize = CHUNK_SIZE,
    overlapTokens = OVERLAP_TOKENS,
    defaultModel = DEFAULT_MODEL
  ) {
    super();
    this.chunkSize = chunkSize;
    this.overlapTokens = overlapTokens;
    this.encoder = encoding_for_model(defaultModel);
  }

  _decodeToString(tokens) {
    return new TextDecoder().decode(this.encoder.decode(tokens));
  }

  _emitDataEvent(chunk, chunkIndex, tokenAmount) {
    this.emit("data", {
      text: this._decodeToString(chunk),
      index: chunkIndex,
      tokenAmount: tokenAmount
    });
  }

  _emitEndEvent() {
    this.emit("end");
  }

  process(text) {
    const tokens = this.encoder.encode(text);

    let currentChunk = [];
    let chunkIndex = 0;

    for (let i = 0; i < tokens.length; i++) {
      currentChunk.push(tokens[i]);
      if (currentChunk.length >= this.chunkSize - this.overlapTokens) {
        this._emitDataEvent(currentChunk, chunkIndex, currentChunk.length);
        currentChunk = currentChunk.slice(-this.overlapTokens);
        chunkIndex += 1;
      }
    }

    if (currentChunk.length > 0) {
      this._emitDataEvent(currentChunk, chunkIndex, currentChunk.length);
    }

    this.encoder.free();
    this._emitEndEvent();
  }
}

module.exports = SplitTextIntoChunks;
