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
    },

    updateLink: (parent, args) => {
      const item = links.find(link => link.id === args.id);
      if (args.url) item.url = args.url;
      if (args.description) item.description = args.description;
      return item
    }
  },

  deleteLink: (parent, args) => {
    const item = links.find(link => link.id === args.id);
  }

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
