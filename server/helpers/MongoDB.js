const { MongoClient } = require("mongodb");

class MongoDB {
  constructor() {
    this.client = null;
    this.db = null;
    this.connectionPromise = null;
  }

  async connect(uri, dbName) {
    if (this.client && this.client.isConnected()) {
      return;
    }

    if (!this.connectionPromise) {
      this.connectionPromise = (async () => {
        this.client = new MongoClient(uri, {});
        await this.client.connect();
        this.db = this.client.db(dbName);
        console.log("Connected to MongoDB");
      })();
    }

    await this.connectionPromise;
  }

  async disconnect() {
    if (this.client && this.client.isConnected()) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    }
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }

  async insertOne(collectionName, document) {
    const collection = this.getCollection(collectionName);
    const result = await collection.insertOne(document);
    return result ? result.insertedId : null;
  }

  async findOne(collectionName, query) {
    const collection = this.getCollection(collectionName);
    return await collection.findOne(query);
  }

  async findMany(collectionName, query) {
    const collection = this.getCollection(collectionName);
    return await collection.find(query).toArray();
  }

  async updateOne(collectionName, query, update) {
    const collection = this.getCollection(collectionName);
    return await collection.updateOne(query, { $set: update });
  }

  async deleteOne(collectionName, query) {
    const collection = this.getCollection(collectionName);
    return await collection.deleteOne(query);
  }
}

module.exports = MongoDB;
