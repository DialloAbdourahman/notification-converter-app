import { ForgotPasswordEvent } from "@daconverter/common-libs";
import { Channel, ConsumeMessage } from "amqplib";
import { AwsSesHelper } from "../../../email/aws-ses";

export const forgotPasswordHandler = async (
  data: ForgotPasswordEvent["data"],
  message: ConsumeMessage,
  channel: Channel
) => {
  try {
    console.log("Forgot password handler called");

    const awsSesHelper = new AwsSesHelper();

    await awsSesHelper.sendResetPasswordEmail(
      data.email,
      data.fullname,
      data.code
    );

    channel.ack(message);
  } catch (error) {
    channel.nack(message, false, true);
  }
};
