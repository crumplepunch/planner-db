const { ApolloServer } = require('apollo-server')
const ProjectTypeDefs = require('./projects/typedefs.js')
const ProjectResolvers = require('./projects/resolvers.js')

require('dotenv').config()
const assert = require('assert')

const client = require('./db')
let db
client.connect(err => {
  assert.equal(err, null)
  console.log(err)
  db = client.db('planner-db')
})


console.log(ProjectResolvers)
const server = new ApolloServer({
  typeDefs: [ProjectTypeDefs],
  resolvers: Object.assign({}, ProjectResolvers)
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))