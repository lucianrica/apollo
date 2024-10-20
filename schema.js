import db from "./_db.js"

const typeDefs = `#graphql
    scalar Json

    type RequestItem {
        id: ID!
        inserted_date: Int!
        payload: Json!
    }

    type EvaluationItem {
        id: ID!
        inserted_date: Int!
        payload: Json!
        request: RequestItem!
    }

    type Query {
        evaluations(page: Int = 1): [EvaluationItem]
        evaluation(id: ID!): EvaluationItem
        requests: [RequestItem]
    }
`

const resolvers = {
    Query: {
        evaluations: (parent, args, context) => {
            // return db.responses
            if (args.page == 0) { args.page = 1 }
            return db.responses.slice((args.page - 1) * 2, args.page * 2)
        },
        evaluation: (parent, args, context) => {
            return db.responses.find((item) => item.id === args.id)
        },
        requests: () => {
            return db.responses
        },
    },
    EvaluationItem: {
        request: (parent) => {
            return db.requests.find((item) => item.id === parent.id)
        }
    }

}

export { typeDefs, resolvers }
