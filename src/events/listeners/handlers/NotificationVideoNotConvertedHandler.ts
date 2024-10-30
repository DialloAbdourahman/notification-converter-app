import { NotificationVideoNotConvertedEvent } from "@daconverter/common-libs";
import { Channel, ConsumeMessage } from "amqplib";
import { AwsSesHelper } from "../../../email/aws-ses";

export const notificationVideoNotConvertedHandler = async (
  data: NotificationVideoNotConvertedEvent["data"],
  message: ConsumeMessage,
  channel: Channel
) => {
  try {
    console.log("Notification video not converted handler called");

    const awsSesHelper = new AwsSesHelper();

    await awsSesHelper.sendFailureEmail(data.email, data.resourceId);

    console.log("email sent");

    channel.ack(message);
  } catch (error) {
    console.log(error);

    channel.nack(message, false, true);
  }
};
