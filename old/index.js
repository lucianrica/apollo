// https://www.apollographql.com/docs/apollo-server/api/express-middleware

import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
// import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled"
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'

// import {
//     ApolloServerPluginLandingPageGraphQLPlayground,
// } from "apollo-server-core";

import {
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "@apollo/server-plugin-landing-page-graphql-playground";


import { typeDefs } from "./schema.js"
import { resolvers } from "./resolvers.js"




const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.info(`Server ready at ${url}`)


// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [
//         {
//             async serverWillStart() {
//               return {
//                 async renderLandingPage() {
//                   const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//         </head>
//         <body>
//           <h1>Hello world!</h1>
//         </body>
//       </html>`;
//                   return { html };
//                 }
//               }
//             }
//           }
//     ],
//     // plugins: [ApolloServerPluginLandingPageDisabled()],
// })


// OLD playground

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     // csrfPrevention: true,
//     // cache: "bounded",
//     // introspection: true,
//     // plugins: [
//     //     ApolloServerPluginLandingPageGraphQLPlayground({
//     //         persistExplorerState: true,
//     //         embed: {
//     //             editor: { theme: "light" }
//     //         }
//     //     })
//     // ],
//     // plugins: [ApolloServerPluginLandingPageDisabled()],
// })
