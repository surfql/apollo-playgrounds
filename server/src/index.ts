const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLScalarType, Kind } = require('graphql');
const { data } = require('./data');
console.log(data.users);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  scalar Date

  enum WaveType {
    BEACH_BREAK
    POINT_BREAK
    REEF_BREAK
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profilePicture: String
    createdAt: Date!
    updatedAt: Date!
  }

  type SurfSpot {
    id: ID!
    name: String!
    location: String!
    waveType: WaveType!
    difficultyLevel: Int!
    reviews: [SurfSpotReview!]
    createdAt: Date!
    updatedAt: Date!
  }

  type SurfSpotReview {
    id: ID!
    rating: Int!
    description: String!
    user: User!
    surfSpot: SurfSpot!
    createdAt: Date!
    updatedAt: Date!
  }

  type Surfboard {
    id: ID!
    brand: String!
    model: String!
    type: String!
    length: Float!
    width: Float!
    thickness: Float!
    volume: Float!
    reviews: [SurfboardReview!]
    createdAt: Date!
    updatedAt: Date!
  }

  type SurfboardReview {
    id: ID!
    rating: Int!
    description: String!
    user: User!
    surfboard: Surfboard!
    createdAt: Date!
    updatedAt: Date!
  }

  type SurfingCompetition {
    id: ID!
    name: String!
    location: String!
    startDate: Date!
    endDate: Date!
    format: String!
    surfers: [Surfer!]
    createdAt: Date!
    updatedAt: Date!
  }

  type Surfer {
    id: ID!
    name: String!
    age: Int!
    style: String!
    profilePicture: String
    competitions: [SurfingCompetition!]
    createdAt: Date!
    updatedAt: Date!
  }

  input NewUserInput {
    name: String!
    email: String!
    password: String!
  }

  input NewSurfSpotInput {
    name: String!
    location: String!
    waveType: WaveType!
    difficultyLevel: Int!
  }

  input NewSurfSpotReviewInput {
    rating: Int!
    description: String!
    surfSpotId: ID!
  }

  input NewSurfboardInput {
    brand: String!
    model: String!
    type: String!
    length: Float!
    width: Float!
    thickness: Float!
    volume: Float!
  }

  input NewSurfboardReviewInput {
    rating: Int!
    description: String!
    surfboardId: ID!
  }

  input NewSurfingCompetitionInput {
    name: String!
    location: String!
    startDate: Date!
    endDate: Date!
    format: String!
  }

  input NewSurferInput {
    name: String!
    age: Int!
    style: String!
  }

  type Query {
    # User queries
    me: User
    user(id: ID!): User

    # Surf spot queries
    surfSpots: [SurfSpot!]
    surfSpot(id: ID!): SurfSpot

    # Surfboard queries
    surfboards: [Surfboard!]
    surfboard(id: ID!): Surfboard

    # Surfing competition queries
    surfingCompetitions: [SurfingCompetition!]
    surfingCompetition(id: ID!): SurfingCompetition

    # Surfer queries
    surfers: [Surfer!]
    surfer(id: ID!): Surfer
  }

  type Mutation {
    # User mutations
    signUp(input: NewUserInput!): String
    signIn(email: String!): String

    # Surf spot mutations
    createSurfSpot(input: NewSurfSpotInput!): SurfSpot
    updateSurfSpot(id: ID!, input: NewSurfSpotInput!): SurfSpot
    deleteSurfSpot(id: ID!): Boolean
    createSurfSpotReview(input: NewSurfSpotReviewInput!): SurfSpotReview

    # Surfboard mutations
    createSurfboard(input: NewSurfboardInput!): Surfboard
    updateSurfboard(id: ID!, input: NewSurfboardInput!): Surfboard
    deleteSurfboard(id: ID!): Boolean
    createSurfboardReview(input: NewSurfboardReviewInput!): SurfboardReview

    # Surfing competition mutations
    createSurfingCompetition(input: NewSurfingCompetitionInput!): SurfingCompetition
    updateSurfingCompetition(id: ID!, input: NewSurfingCompetitionInput!): SurfingCompetition
    deleteSurfingCompetition(id: ID!): Boolean

    # Surfer mutations
    createSurfer(input: NewSurferInput!): Surfer
    updateSurfer(id: ID!, input: NewSurferInput!): Surfer
    deleteSurfer(id: ID!): Boolean
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // books: () => books,
  },
  Date: dateScalar
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
});

// console.log(`🚀  Server ready at: ${url}`);