import { UserCreatedEvent } from "@daconverter/common-libs";
import { Channel, ConsumeMessage } from "amqplib";
import { AwsSesHelper } from "../../../email/aws-ses";

export const userCreatedHandler = async (
  data: UserCreatedEvent["data"],
  message: ConsumeMessage,
  channel: Channel
) => {
  try {
    console.log("User created handler called");

    const awsSesHelper = new AwsSesHelper();

    await awsSesHelper.sendActivateAccountEmail(
      data.email,
      data.fullname,
      data.code
    );

    channel.ack(message);
  } catch (error) {
    channel.nack(message, false, true);
  }
};
