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
    projects: async (_, { sortField, direction }) => {
      const sort = {
        name: 1
      }
      sortField && (sort[sortField] = 1)
      direction && (sort[sortField] = direction)

      const values = await db.collection('projects').aggregate([{
        $lookup: {
          from: 'project-logs',
          localField: '_id',
          foreignField: 'project',
          as: 'logs'
        }
      }]).sort(sort).toArray().then(res => { return res })
      return values
    },
    project: async (_, { id, name }) => {
      const query = {}
      console.log(id)
      id && (query._id = ObjectId(id))
      name && (query.name = { $regex: `^${name}$`, $options: 'i' })

      const doc = await db.collection('projects').findOne(query)
      return doc
    },
    logs: async (_, { }) => {
      const doc = await db.collection('project-logs').find().toArray()
      return doc
    }
  },
  Mutation: {
    addProject: async (_, project) => {
      console.log({ project })

      const { insertedId } = await db.collection('projects').insertOne(project)
      console.log({ project })
      const doc = await db.collection('projects').findOne({ _id: ObjectId(insertedId) })
      console.log({
        input: project,
        doc
      })

      return doc
    }
  }
}