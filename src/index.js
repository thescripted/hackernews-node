const { GraphQLServer } = require('graphql-yoga')


const links = [{
    id: 'jfafjzf',
    description: "Hello Bitch",
    url: "String",
  }]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'This is a GraphQL Info!',
    feed: () => links,
    link: (parent, args) => {
      const item = links.find(link => link.id === args.id);
      return item;
    },
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      const item = links.find(link => link.id === args.id);
      if (args.url) item.url = args.url;
      if (args.description) item.description = args.description;
      return item
    }
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
