const { ApolloServer, gql } = require('apollo-server')
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
  projects:[Project]
  hello: String
}

type Project{
  _id: String
  name: String
  description: String
}
`

const resolvers = {
  Query: {
    hello: () => {
      return `hey sup ? `
    },
    projects: async () => {
      const values = await db.collection('projects').find().toArray().then(res => { return res })
      console.log({ values })
      return values
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url} `))