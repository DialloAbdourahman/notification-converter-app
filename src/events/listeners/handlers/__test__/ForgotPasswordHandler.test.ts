import { ForgotPasswordEvent } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import mongoose from "mongoose";
import { forgotPasswordHandler } from "../ForgotPasswordHandler";

it("should handle a user created event", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const data: ForgotPasswordEvent["data"] = {
    email: "test@test.com",
    fullname: "",
    code: "1234",
  };

  // Create a fake channel object and message object.
  // @ts-ignore
  const msg: ConsumeMessage = {};
  // @ts-ignore
  const channel: Channel = {
    ack: jest.fn().mockImplementation((msg: ConsumeMessage) => {}),
  };

  await forgotPasswordHandler(data, msg, channel);
});
