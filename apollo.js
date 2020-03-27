const { ApolloServer, gql } = require('apollo-server')
const { ObjectId } = require('mongodb')
require('dotenv').config()
const assert = require('assert')


const client = require('./db')

let db
client.connect(err => {
  assert.equal(err, null)
  console.log(err)
  db = client.db('planner-db')
})

const typeDefs = gql`
type Query {
  projects(sortField: String, direction: Int):[Project]
  project(id: ID, name: String): Project
}

type Completion {
  message: String
  date: String
}

type Vertical {
  lead: String
  stack: [String]
  completions: [Completion]
}

type Plan {
  status: Int
  name: String
  spec: String 
}

type Plans {
  infrastructure: [Plan]
  design: [Plan]
  release:  [Plan]
}

type Project{
  _id: String
  name: String
  description: String
  design: Vertical
  development: Vertical
  plans: Plans
}
`

const resolvers = {
  Query: {
    projects: async (_, { sortField, direction }) => {
      const sort = {}
      sortField && (sort[sortField] = 1)
      direction && (sort[sortField] = direction)

      const values = await db.collection('projects').find().sort(sort).toArray().then(res => { return res })
      console.log({ values })
      return values
    },
    project: async (_, { id, name }) => {
      const query = {}
      id && (query._id = ObjectId(id))
      name && (query.name = { $regex: `^${name}$`, $options: 'i' })

      const doc = await db.collection('projects').findOne(query)
      console.log({
        query,
        doc
      })
      return doc
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))