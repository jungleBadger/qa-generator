const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.connectionPromise = null;
    this.models = {};
  }

  async connect(uri, options = {}) {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (!this.connectionPromise) {
      this.connectionPromise = mongoose
        .connect(uri, {
          ...options
        })
        .then(() => {
          console.log("Connected to MongoDB with Mongoose");
        })
        .catch((err) => {
          console.error("Mongoose connection error:", err);
          this.connectionPromise = null; // Reset promise on error
        });
    }

    await this.connectionPromise;
  }

  async disconnect() {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB with Mongoose");
    }
  }

  getModel(name, schemaDefinition) {
    if (!this.models[name]) {
      const schema = new mongoose.Schema(schemaDefinition, {
        timestamps: true
      });
      this.models[name] = mongoose.model(name, schema);
    }
    return this.models[name];
  }

  async insertOne(modelName, schemaDefinition, document) {
    const Model = this.getModel(modelName, schemaDefinition);
    const newDocument = new Model(document);
    const result = await newDocument.save();
    return result._id;
  }

  async findOne(modelName, schemaDefinition, query) {
    const Model = this.getModel(modelName, schemaDefinition);
    return await Model.findOne(query).exec();
  }

  async findMany(modelName, schemaDefinition, query) {
    const Model = this.getModel(modelName, schemaDefinition);
    return await Model.find(query).exec();
  }

  async updateOne(modelName, schemaDefinition, query, update) {
    const Model = this.getModel(modelName, schemaDefinition);
    return await Model.updateOne(query, { $set: update }).exec();
  }

  async deleteOne(modelName, schemaDefinition, query) {
    const Model = this.getModel(modelName, schemaDefinition);
    return await Model.deleteOne(query).exec();
  }
}

module.exports = MongoDB;
