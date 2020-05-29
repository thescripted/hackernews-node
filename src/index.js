const { GraphQLServer } = require('graphql-yoga')


const typeDefs = `
type Query {
  info: String!
  }
`


const resolvers = {
  Query: {
    info: () => `This is the API for a Hackernews Clone`
  }
}


const server = new graphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
