const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLScalarType, Kind } = require("graphql");
const { data } = require("./data");
const { User, SurfSpot, Surfboard, SurfingCompetition, Surfer, SurfSpotReview, SurfboardReview } = require("./database");

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
    createdAt: Date
    updatedAt: Date
  }

  type SurfSpot {
    id: ID!
    name: String!
    location: String!
    waveType: WaveType!
    difficultyLevel: Int!
    reviews: [SurfSpotReview!]
    createdAt: Date
    updatedAt: Date
  }

  type SurfSpotReview {
    id: ID!
    rating: Int!
    description: String!
    user: User!
    surfSpot: SurfSpot!
    createdAt: Date
    updatedAt: Date
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
    createdAt: Date
    updatedAt: Date
  }

  type SurfboardReview {
    id: ID!
    rating: Int!
    description: String!
    user: User!
    surfboard: Surfboard!
    createdAt: Date
    updatedAt: Date
  }

  type SurfingCompetition {
    id: ID!
    name: String!
    location: String!
    startDate: Date!
    endDate: Date!
    format: String!
    surfers: [Surfer!]
    createdAt: Date
    updatedAt: Date
  }

  type Surfer {
    id: ID!
    name: String!
    age: Int!
    style: String!
    profilePicture: String
    competitions: [SurfingCompetition!]
    createdAt: Date
    updatedAt: Date
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
    users: [User!]!
    surfSpots: [SurfSpot!]!
    surfboards: [Surfboard!]!
    surfingCompetitions: [SurfingCompetition!]!
    surfers: [Surfer!]!
    surfSpotById(id: ID!): SurfSpot
    surfboardById(id: ID!): Surfboard
    surfingCompetitionById(id: ID!): SurfingCompetition
    surferById(id: ID!): Surfer
  }

  type Mutation {
    createSurfSpot(input: NewSurfSpotInput!): SurfSpot
    updateSurfSpot(id: ID!, input: NewSurfSpotInput!): SurfSpot
    deleteSurfSpot(id: ID!): ID
    createSurfSpotReview(input: NewSurfSpotReviewInput!): SurfSpotReview
    createSurfboard(input: NewSurfboardInput!): Surfboard
    updateSurfboard(id: ID!, input: NewSurfboardInput!): Surfboard
    deleteSurfboard(id: ID!): ID
    createSurfboardReview(input: NewSurfboardReviewInput!): SurfboardReview
    createSurfingCompetition(input: NewSurfingCompetitionInput!): SurfingCompetition
    updateSurfingCompetition(id: ID!, input: NewSurfingCompetitionInput!): SurfingCompetition
    deleteSurfingCompetition(id: ID!): ID
    createSurfer(input: NewSurferInput!): Surfer
    updateSurfer(id: ID!, input: NewSurferInput!): Surfer
    deleteSurfer(id: ID!): ID
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
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

const resolvers = {
  Query: {
    users: async () => {
      // retrieve all users from the database
      const users = await User.find();
      return users;
    },
    surfSpots: async () => {
      // retrieve all surf spots from the database
      const surfSpots = await SurfSpot.find();
      return surfSpots;
    },
    surfboards: async () => {
      // retrieve all surfboards from the database
      const surfboards = await Surfboard.find();
      return surfboards;
    },
    surfingCompetitions: async () => {
      // retrieve all surfing competitions from the database
      const surfingCompetitions = await SurfingCompetition.find();
      return surfingCompetitions;
    },
    surfers: async () => {
      // retrieve all surfers from the database
      const surfers = await Surfer.find();
      return surfers;
    },
    surfSpotById: async (_, { id }) => {
      // retrieve a specific surf spot by its ID
      const surfSpot = await SurfSpot.findById(id);
      return surfSpot;
    },
    surfboardById: async (_, { id }) => {
      // retrieve a specific surfboard by its ID
      const surfboard = await Surfboard.findById(id);
      return surfboard;
    },
    surfingCompetitionById: async (_, { id }) => {
      // retrieve a specific surfing competition by its ID
      const surfingCompetition = await SurfingCompetition.findById(id);
      return surfingCompetition;
    },
    surferById: async (_, { id }) => {
      // retrieve a specific surfer by their ID
      const surfer = await Surfer.findById(id);
      return surfer;
    },
  },
  Mutation: {
    createSurfSpot: async (_, { input }) => {
      // create a new surf spot using the provided input
      const newSurfSpot = await SurfSpot.create(input);
      return newSurfSpot;
    },
    updateSurfSpot: async (_, { id, input }) => {
      // update a specific surf spot with the provided input
      const updatedSurfSpot = await SurfSpot.findByIdAndUpdate(id, input, {
        new: true,
      });
      return updatedSurfSpot;
    },
    deleteSurfSpot: async (_, { id }) => {
      // delete a specific surf spot by its ID
      const deletedSurfSpot = await SurfSpot.findByIdAndDelete(id);
      return Boolean(deletedSurfSpot);
    },
    createSurfSpotReview: async (_, { input }) => {
      // create a new surf spot review using the provided input
      const newSurfSpotReview = await SurfSpotReview.create(input);
      return newSurfSpotReview;
    },
    createSurfboard: async (_, { input }) => {
      // create a new surfboard using the provided input
      const newSurfboard = await Surfboard.create(input);
      return newSurfboard;
    },
    updateSurfboard: async (_, { id, input }) => {
      // update a specific surfboard with the provided input
      const updatedSurfboard = await Surfboard.findByIdAndUpdate(id, input, {
        new: true,
      });
      return updatedSurfboard;
    },
    deleteSurfboard: async (_, { id }) => {
      // delete a specific surfboard by its ID
      const deletedSurfboard = await Surfboard.findByIdAndDelete(id);
      return Boolean(deletedSurfboard);
    },
    createSurfboardReview: async (_, { input }) => {
      // create a new surfboard review using the provided input
      const newSurfboardReview = await SurfboardReview.create(input);
      return newSurfboardReview;
    },
    createSurfingCompetition: async (_, { input }) => {
      // create a new surfing competition using the provided input
      const newSurfingCompetition = await SurfingCompetition.create(input);
      return newSurfingCompetition;
    },
    updateSurfingCompetition: async (_, { id, input }) => {
      // update a specific surfing competition with the provided input
      const updatedSurfingCompetition =
        await SurfingCompetition.findByIdAndUpdate(id, input, { new: true });
      return updatedSurfingCompetition;
    },
    deleteSurfingCompetition: async (_, { id }) => {
      // delete a specific surfing competition by its ID
      const deletedSurfingCompetition =
        await SurfingCompetition.findByIdAndDelete(id);
      return Boolean(deletedSurfingCompetition);
    },
    createSurfer: async (_, { input }) => {
      // create a new surfer using the provided input
      const newSurfer = await Surfer.create(input);
      return newSurfer;
    },
    updateSurfer: async (_, { id, input }) => {
      // update a specific surfer with the provided input
      const updatedSurfer = await Surfer.findByIdAndUpdate(id, input, {
        new: true,
      });
      return updatedSurfer;
    },
    deleteSurfer: async (_, { id }) => {
      // delete a specific surfer by their ID
      const deletedSurfer = await Surfer.findByIdAndDelete(id);
      return Boolean(deletedSurfer);
    }
  },
  Date: dateScalar
};

// Create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo server
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
