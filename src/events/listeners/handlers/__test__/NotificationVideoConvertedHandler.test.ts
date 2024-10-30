import { NotificationVideoConvertedEvent } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { notificationVideoConvertedHandler } from "../NotificationVideoConvertedHandler";

it("should handle a notification video converted event", async () => {
  const data: NotificationVideoConvertedEvent["data"] = {
    email: "test@test.com",
    resourceId: "asdf",
    fullname: "test",
  };

  // Create a fake channel object and message object.
  // @ts-ignore
  const msg: ConsumeMessage = {};
  // @ts-ignore
  const channel: Channel = {
    ack: jest.fn().mockImplementation((msg: ConsumeMessage) => {}),
  };

  await notificationVideoConvertedHandler(data, msg, channel);
});
