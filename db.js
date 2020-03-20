const { MongoClient } = require('mongodb')
const assert = require('assert')
require('dotenv').config()

const {
  MONGO_URL,
  MONGO_USER,
  MONGO_PASS,
} = process.env


const client = new MongoClient(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`,
  { useNewUrlParser: true }
)

module.exports = client