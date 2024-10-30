import { NotificationServiceListener } from "./events/listeners/listener";
import { rabbitmqWrapper } from "./rabbitmq-wrapper";
require("dotenv").config();

const start = async () => {
  console.log("Starting the Notification service......");

  if (!process.env.ACCESS_TOKEN_JWT_KEY) {
    console.log("ACCESS_TOKEN_JWT_KEY must be defined.");
    process.exit();
  }

  if (!process.env.RABBITMQ_URL) {
    console.log("RABBITMQ_URL must be defined.");
    process.exit();
  }

  if (!process.env.AWS_SES_SMTP_USERNAME) {
    console.log("AWS_SES_SMTP_USERNAME must be defined.");
    process.exit();
  }

  if (!process.env.AWS_SES_SMTP_PASSWORD) {
    console.log("AWS_SES_SMTP_PASSWORD must be defined.");
    process.exit();
  }

  if (!process.env.AWS_SES_SMTP_SENDER_EMAIL) {
    console.log("AWS_SES_SMTP_SENDER_EMAIL must be defined.");
    process.exit();
  }

  if (!process.env.RESOURCE_PAGE_URL) {
    console.log("RESOURCE_PAGE_URL must be defined.");
    process.exit();
  }

  try {
    await rabbitmqWrapper.connect();

    // If for what ever reason we disconnect to skaffold like we delete the skaffold pod
    rabbitmqWrapper.client.on("close", () => {
      console.log("Rabbitmq connection closed.");
      process.exit();
    });

    // when the app terminates
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Closing RabbitMQ connection...");
      await rabbitmqWrapper.client.close();
    });

    // when the app terminates
    process.on("SIGINT", async () => {
      console.log("SIGINT received. Closing RabbitMQ connection...");
      await rabbitmqWrapper.client.close();
    });

    // Running listener
    new NotificationServiceListener(rabbitmqWrapper.client).listen();
  } catch (error) {
    console.log("Error connecting to Rabbitmq.");
    console.log(error);

    // Exit if it cannot connect to rabbit mq and then kubernetes will recreate this pod and retry to connect.
    process.exit();
  }
};

start();
