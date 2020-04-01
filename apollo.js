const { ApolloServer } = require('apollo-server')
const ProjectTypeDefs = require('./projects/typedefs.js')
const ProjectResolvers = require('./projects/resolvers.js')

require('dotenv').config()


const server = new ApolloServer({
  typeDefs: [ProjectTypeDefs],
  resolvers: Object.assign({}, ProjectResolvers)
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))