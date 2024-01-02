const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: './config/.env' });

async function connectToCluster() {
  const uri = process.env.DB_URI;
  const dbName = process.env.DB_NAME;

  let mongoClient;
  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas');
    const db = mongoClient.db(dbName);
    return db;
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit(1);
  } 
}

module.exports = {
  connectToCluster
};