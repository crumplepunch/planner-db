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
  updatedProjects(interval: Interval, sort: Sort): Project
  started: [Project]
  unstarted: [Project]
}

type Interval {
  from: double!
  to: double!
  inclusive: Boolean
  sort: Sort
}

type Sort {
  field: String
  direction: Int
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

type Cost {
  time: Int
  money: Int
}

type Plan {
  cost: Cost
  tasks: [String]
}

type Plans {
  infrastructure: Plan
  design: Plan
  release:  Plan
  research: Plan
  build: Plan
}

type Project{
  _id: String
  name: String
  description: String
  summary: String
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
      console.log(values)
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
    },
    updatedProjects: async (_, { interval, sort = { field: 'updated', direction: -1}}) => {
      console.log(`Calling updatedProjects`)
      const { from , to } = interval

      if (from >= to) console.log('absolutely not') return []


      const docs = await db.collection('projects').find({ updated: { $gt: interval.from, $lt: interval.to }}).sort(sort)
      console.log(docs)
      return docs
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))
