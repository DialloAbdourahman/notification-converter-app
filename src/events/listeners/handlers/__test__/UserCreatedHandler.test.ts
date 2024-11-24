import { UserCreatedEvent } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import mongoose from "mongoose";
import { userCreatedHandler } from "../UserCreatedHandler";

it("should handle a user created event", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const data: UserCreatedEvent["data"] = {
    id,
    email: "test@test.com",
    fullname: "",
    version: 1,
    code: "1234",
  };

  // Create a fake channel object and message object.
  // @ts-ignore
  const msg: ConsumeMessage = {};
  // @ts-ignore
  const channel: Channel = {
    ack: jest.fn().mockImplementation((msg: ConsumeMessage) => {}),
  };

  await userCreatedHandler(data, msg, channel);
});
