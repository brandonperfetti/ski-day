const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
	scalar Date

  """
  An object that describes the characteristics of a ski day
  """
	type Skiday {
    "A ski day's unique identifier"
		id: ID!
    "The date of the ski day"
		date: Date!
    "The mountain where the ski day took place"
		mountain: String!
    "The conditions of the ski day"
		conditions: Conditions
	}

	enum Conditions {
		POWDER
		HEAVY
		ICE
		THIN
	}

	type Query {
		totaldays: Int!
		allDays: [Skiday!]!
	}

	input AddDayInput {
		date: Date!
		mountain: String!
		conditions: Conditions
	}

	type RemoveDayPayload {
		day: Skiday!
		removed: Boolean
		totalBefore: Int
		totalAfter: Int
	}

	type Mutation {
		addDay(input: AddDayInput!): Skiday
		removeDay(id: ID!): RemoveDayPayload!
	}

  type Subscription {
    newDay: Skiday!
  }
`

const mocks = {
	Date: () => '02/10/2023',
	String: () => 'Cool!',
	Query: () => ({
		allDays: () => [...new Array(5)],
	}),
}
const resolvers = {}

const server = new ApolloServer({ typeDefs, mocks })

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
