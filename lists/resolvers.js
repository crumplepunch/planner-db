const { ObjectId } = require('mongodb')
const assert = require('assert')
const client = require('../db')

let db
client.connect(err => {
  assert.equal(err, null)
  console.log(err)
  db = client.db('planner-db')
})

module.exports = {
  Query: {
    list: async (_, { id }) => {
      const values = await db.collection('lists').findOne({ _id: ObjectId(insertedId) })
      return values
    },
    lists: async () => {
      const values = await db.collection('lists').find().toArray()
      console.log({ values })
      return values
    }
  },
  Mutation: {
    deleteList: async (_, { id }) => {
      const result = await db.collection('lists').deleteOne({ _id: ObjectId(id) })

      return true
    },
    updateListToDos: async (_, { id, todos }) => {
      const result = await db.collection('lists').updateOne({
        _id: ObjectId(id)
      }, {
        $set: { todos }
      })

      console.log(result)
      const doc = await db.collection('lists').findOne({ _id: ObjectId(id) })
      console.log({ doc })
      return doc
    },
    addList: async (_, { list }) => {
      console.log({ list })

      const { insertedId } = await db.collection('lists').insertOne(list)
      console.log({ list })
      const doc = await db.collection('lists').findOne({ _id: ObjectId(insertedId) })
      console.log({
        input: list,
        doc
      })

      return doc
    }
  }
}