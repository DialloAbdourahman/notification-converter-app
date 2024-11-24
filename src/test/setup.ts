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
        sendActivateAccountEmail: jest.fn().mockImplementation(() => {
          return Promise.resolve(true);
        }),
        sendResetPasswordEmail: jest.fn().mockImplementation(() => {
          return Promise.resolve(true);
        }),
      };
    }),
  };
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
