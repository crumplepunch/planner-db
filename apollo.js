const { ApolloServer } = require('apollo-server')


require('dotenv').config()

const server = new ApolloServer({
  typeDefs: [
    require('./projects/typedefs.js'),
    require('./lists/typedefs.js')
  ],
  resolvers: Object.assign(
    {},
    require('./projects/resolvers.js'),
    require('./lists/resolvers.js')
  )
})

server.listen(4000).then(({ url }) => console.log(`Server running at ${url}`))