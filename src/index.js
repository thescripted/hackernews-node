const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma.client')

const resolvers = {
  Query: {
    info: () => 'This is a GraphQL Info!',
    feed: (root, args, context, info) => {return context.prisma.links()}
  },

  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    }
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
