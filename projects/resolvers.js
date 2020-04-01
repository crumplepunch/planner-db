const { ObjectId } = require('mongodb')
module.exports = {
  Query: {
    projects: async (_, { sortField, direction }) => {
      const sort = {}
      sortField && (sort[sortField] = 1)
      direction && (sort[sortField] = direction)

      const values = await db.collection('projects').find().sort(sort).toArray().then(res => { return res })
      return values
    },
    project: async (_, { id, name }) => {
      const query = {}
      id && (query._id = ObjectId(id))
      name && (query.name = { $regex: `^${name}$`, $options: 'i' })

      const doc = await db.collection('projects').findOne(query)
      return doc
    }
  }
}