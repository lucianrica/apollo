
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        review(parent, args, context) {
            return db.reviews.find((item) => item.id === args.id)
        },
        game(parent, args, context) {
            return db.games.find((item) => item.id === args.id)
        },
        author(parent, args, context) {
            return db.authors.find((item) => item.id === args.id)
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(parent, args) {
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(parents, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(parent, args) {
            db.games = db.games.map((g) => {
                if (g.id === args.id) {
                    return { ...g, ...args.edit }
                }
                return g
            })
            return db.games.find((g) => g.id === args.id)
        }
    }
}
