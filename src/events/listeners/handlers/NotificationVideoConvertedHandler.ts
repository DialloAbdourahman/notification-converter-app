import { NotificationVideoConvertedEvent } from "@daconverter/common-libs";
import { Channel, ConsumeMessage } from "amqplib";
import { AwsSesHelper } from "../../../email/aws-ses";

export const notificationVideoConvertedHandler = async (
  data: NotificationVideoConvertedEvent["data"],
  message: ConsumeMessage,
  channel: Channel
) => {
  try {
    console.log("Notification video converted handler called");

    const awsSesHelper = new AwsSesHelper();

    await awsSesHelper.sendSuccessEmail(data.email, data.resourceId);

    console.log("email sent");

    channel.ack(message);
  } catch (error) {
    console.log(error);

    channel.nack(message, false, true);
  }
};
