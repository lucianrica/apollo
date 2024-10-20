import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { typeDefs, resolvers } from './schema.js'



const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
})
await server.start()

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({}),
    }),
)

app.use(express.static('build'))
app.use("*", express.static('build'))

app.get('/*', (req, res) => {
    // because it's module use import.meta.dirname instead of __dirname
    res.sendFile(import.meta.dirname + '/index.html');
})

await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
)

console.log(`🚀 Server ready at http://localhost:4000`);




// import { ApolloServer } from "@apollo/server"
// import { startStandaloneServer } from "@apollo/server/standalone"

// import { typeDefs } from "./schema.js"
// import { resolvers } from "./resolvers.js"

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// })

// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 }
// })

// console.info(`Server ready at ${url}`)



// ===================================================
// ERROR EG
// {
//     "data": null,
//     "error": {
//       "message": "Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON",
//       "stack": "SyntaxError: Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"
//     }
//   }
