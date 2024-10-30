import { NotificationVideoNotConvertedEvent } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { notificationVideoConvertedHandler } from "../NotificationVideoConvertedHandler";
import { notificationVideoNotConvertedHandler } from "../NotificationVideoNotConvertedHandler";

it("should handle a notification video converted event", async () => {
  const data: NotificationVideoNotConvertedEvent["data"] = {
    email: "test@test.com",
    resourceId: "asdf",
  };

  // Create a fake channel object and message object.
  // @ts-ignore
  const msg: ConsumeMessage = {};
  // @ts-ignore
  const channel: Channel = {
    ack: jest.fn().mockImplementation((msg: ConsumeMessage) => {}),
  };

  await notificationVideoNotConvertedHandler(data, msg, channel);
});
