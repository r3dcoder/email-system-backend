const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const getDB = () => client.db("your-database-name");

module.exports = { connectDB, getDB };
