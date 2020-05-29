const { GraphQLServer } = require('graphql-yoga')


const links = [{
    id: 'jfafjzf',
    description: "Hello Bitch",
    url: "String",
  }]

const resolvers = {
  Query: {
    info: () => 'This is a GraphQL Info!',
    feed: () => links,
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },

}


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
