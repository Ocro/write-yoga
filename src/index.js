const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: context => ({
        ...context,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: '',
            secret: '',
            debug: true,
        }),
    }),
})
server.start(() => console.log(`Server is running on localhost:4000`))
