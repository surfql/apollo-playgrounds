export class MockDatabase {
  data: any;

  constructor() {
    this.data = [];
  }

  loadMockData(mockData) {
    mockData.forEach((item) => {
      this.data.push(item);
    });
  }

  create(document) {
    if (!this.data) {
      this.data = [];
    }
    this.data.push(document);
    return document;
  }

  find(filter) {
    return filter ? this.data.filter(filter) : this.data;
  }

  findById(id) {
    return this.data.find((item) => item.id === id);
  }

  findOne(filter) {
    return this.data.find(filter);
  }

  update(filter, update) {
    this.data.forEach((item, index) => {
      if (filter(item)) {
        this.data[index] = { ...item, ...update };
      }
    });
  }

  deleteOne(filter) {
    const collection = this.data || [];
    const index = collection.findIndex(filter);
    if (index !== -1) {
      collection.splice(index, 1);
    }
  }

  deleteMany(filter) {
    const collection = this.data || [];
    this.data = collection.filter((item) => !filter(item));
  }
}

/*
 * Mock data for the mock database
 */

export const User = new MockDatabase();
const userMockData = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://example.com/profile.jpg",
    createdAt: new Date("2022-01-01T00:00:00Z"),
    updatedAt: new Date("2022-01-01T00:00:00Z"),
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "janedoe@example.com",
    profilePicture: "https://example.com/profile.jpg",
    createdAt: new Date("2022-01-02T00:00:00Z"),
    updatedAt: new Date("2022-01-02T00:00:00Z"),
  },
  // add more users here
];
User.loadMockData(userMockData);

const surfSpotReview1: any = {
  id: "1",
  rating: 5,
  description: "Awesome waves!",
  user: userMockData[0],
  createdAt: new Date("2022-02-10T08:00:00Z"),
  updatedAt: new Date("2022-02-10T08:00:00Z")
}

const surfSpotReview2: any = {
  id: "2",
  rating: 4,
  description: "Great spot, but can get crowded.",
  user: userMockData[1],
  createdAt: new Date("2022-02-11T08:00:00Z"),
  updatedAt: new Date("2022-02-11T08:00:00Z")
}

export const SurfSpot = new MockDatabase();
const surfSpotMockData = [
  {
    id: "1",
    name: "Pipeline",
    location: "Oahu, Hawaii",
    waveType: "REEF",
    difficultyLevel: 5,
    reviews: [surfSpotReview1],
    createdAt: new Date("2022-01-01T00:00:00Z"),
    updatedAt: new Date("2022-01-01T00:00:00Z"),
  },
  {
    id: "2",
    name: "Uluwatu",
    location: "Bali, Indonesia",
    waveType: "REEF",
    difficultyLevel: 4,
    reviews: [surfSpotReview2],
    createdAt: new Date("2022-01-02T00:00:00Z"),
    updatedAt: new Date("2022-01-02T00:00:00Z"),
  },
  // add more surf spots here
];
SurfSpot.loadMockData(surfSpotMockData);

surfSpotReview1.surfSpot = surfSpotMockData[0];
surfSpotReview2.surfSpot = surfSpotMockData[1];

export const SurfboardReview = new MockDatabase();
const surfboardReviewMockData = [
  {
    id: "1",
    rating: 4,
    description: "Awesome surf spot!",
    user: userMockData[0],
    surfSpot: surfSpotMockData[0],
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01"),
  },
  {
    id: "2",
    rating: 5,
    description: "The best surf spot I've ever been to!",
    user: userMockData[1],
    surfSpot: surfSpotMockData[1],
    createdAt: new Date("2022-01-02"),
    updatedAt: new Date("2022-01-02"),
  },
  {
    id: "3",
    rating: 3,
    description: "Decent spot, but crowded.",
    user: userMockData[2],
    surfSpot: surfSpotMockData[2],
    createdAt: new Date("2022-01-03"),
    updatedAt: new Date("2022-01-03"),
  },
];
SurfboardReview.loadMockData(surfboardReviewMockData);

export const Surfboard = new MockDatabase();
const surfboardMockData = [
  {
    id: "1",
    name: "Pipeline",
    location: "Oahu, Hawaii",
    waveType: "REEF",
    difficultyLevel: 5,
    reviews: [surfboardReviewMockData[0], surfboardReviewMockData[1]],
    createdAt: new Date("2022-02-10T08:00:00Z"),
    updatedAt: new Date("2022-02-10T08:00:00Z"),
  },
  {
    id: "2",
    name: "Jeffreys Bay",
    location: "Eastern Cape, South Africa",
    waveType: "POINT",
    difficultyLevel: 4,
    reviews: [surfboardReviewMockData[2]],
    createdAt: new Date("2022-02-11T08:00:00Z"),
    updatedAt: new Date("2022-02-11T08:00:00Z"),
  },
  {
    id: "3",
    name: "Mavericks",
    location: "California, USA",
    waveType: "REEF",
    difficultyLevel: 5,
    reviews: [],
    createdAt: new Date("2022-02-12T08:00:00Z"),
    updatedAt: new Date("2022-02-12T08:00:00Z"),
  },
];
Surfboard.loadMockData(surfboardMockData);

const surfingCompetition1: any = {
  id: "1",
  name: "Pipeline Masters",
  location: "Banzai Pipeline, Hawaii",
  startDate: "2023-12-08T00:00:00.000Z",
  endDate: "2023-12-20T00:00:00.000Z",
  format: "Man-on-man elimination",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const surfingCompetition2: any = {
  id: "2",
  name: "Quiksilver Pro Gold Coast",
  location: "Snapper Rocks, Australia",
  startDate: "2024-03-15T00:00:00.000Z",
  endDate: "2024-03-25T00:00:00.000Z",
  format: "Man-on-man elimination",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Surfer = new MockDatabase();
const surferMockData = [
  {
    id: "1",
    name: "Kelly Slater",
    age: 49,
    style: "Regular",
    profilePicture: "https://someimageurl.com/1.jpg",
    competitions: ["1", "2"],
    createdAt: new Date("2022-03-09T10:00:00.000Z"),
    updatedAt: new Date("2022-03-09T10:00:00.000Z"),
  },
  {
    id: "2",
    name: "Stephanie Gilmore",
    age: 33,
    style: "Goofy",
    profilePicture: "https://someimageurl.com/2.jpg",
    competitions: [surfingCompetition1],
    createdAt: new Date("2022-03-09T10:00:00.000Z"),
    updatedAt: new Date("2022-03-09T10:00:00.000Z"),
  },
  {
    id: "3",
    name: "John John Florence",
    age: 29,
    style: "Regular",
    profilePicture: "https://someimageurl.com/3.jpg",
    competitions: [surfingCompetition1, surfingCompetition2],
    createdAt: new Date("2022-03-09T10:00:00.000Z"),
    updatedAt: new Date("2022-03-09T10:00:00.000Z"),
  },
  {
    id: "4",
    name: "Carissa Moore",
    age: 29,
    style: "Goofy",
    profilePicture: "https://someimageurl.com/4.jpg",
    competitions: [surfingCompetition2],
    createdAt: new Date("2022-03-09T10:00:00.000Z"),
    updatedAt: new Date("2022-03-09T10:00:00.000Z"),
  },
];
Surfer.loadMockData(surferMockData);

surfingCompetition1.surfers = [surferMockData[0], surferMockData[1], surferMockData[2]]
surfingCompetition2.surfers = [surferMockData[3]]

export const SurfingCompetition = new MockDatabase();
const surfingCompetitionMockData = [
  surfingCompetition1,
  surfingCompetition2,
];
SurfingCompetition.loadMockData(surfingCompetitionMockData);

export const SurfSpotReview = new MockDatabase();
const surfSpotReviewMockData = [surfSpotReview1, surfSpotReview2];
SurfSpotReview.loadMockData(surfSpotReviewMockData);
