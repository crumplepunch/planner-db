const { ApolloServer } = require('apollo-server')
// const ProjectTypeDefs = require('./projects/typedefs.js')
const ProjectResolvers = require('./projects/resolvers.js')

require('dotenv').config()

const server = new ApolloServer({
  typeDefs: [
    // require('./projects/typedefs.js'),
    require('./lists/typedefs.js')
  ],
  resolvers: Object.assign(
    {},
    // ProjectResolvers,
    require('./lists/resolvers.js')
  )
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))
