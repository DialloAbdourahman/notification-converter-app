import mongoose, { mongo } from "mongoose";

jest.mock("../rabbitmq-wrapper.ts");

jest.mock("../email/aws-ses.ts", () => {
  return {
    AwsSesHelper: jest.fn().mockImplementation(() => {
      return {
        sendSuccessEmail: jest.fn().mockImplementation(() => {
          return Promise.resolve(true);
        }),
        sendFailureEmail: jest.fn().mockImplementation(() => {
          return Promise.resolve(true);
        }),
      };
    }),
  };
});

// Runs before all our tests starts
beforeAll(async () => {
  process.env.ACCESS_TOKEN_JWT_KEY = "1234";
  process.env.MONGO_URI = "mongodb://localhost:27017/resource-test";

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb successfully");
  } catch (error) {
    console.log("Database connection error", error);
    // process.exit();
  }
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("disconnected to mongodb");
});
