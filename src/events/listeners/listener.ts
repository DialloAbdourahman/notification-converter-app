import { EXCHANGES, KEYS, Listener, QUEUES } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { notificationVideoConvertedHandler } from "./handlers/NotificationVideoConvertedHandler";
import { notificationVideoNotConvertedHandler } from "./handlers/NotificationVideoNotConvertedHandler";
import { userCreatedHandler } from "./handlers/UserCreatedHandler";
import { forgotPasswordHandler } from "./handlers/ForgotPasswordHandler";

export class NotificationServiceListener extends Listener {
  keys: KEYS[] = [
    KEYS.NOTIFICATION_VIDEO_CONVERTED,
    KEYS.NOTIFICATION_VIDEO_NOT_CONVERTED,
    KEYS.USER_CREATED,
    KEYS.FORGOT_PASSWORD,
  ];
  exchange: EXCHANGES = EXCHANGES.CONVERTER_EXCHANGE;
  queue: QUEUES = QUEUES.NOTIFICATION_QUEUE;

  async handleEvents(key: KEYS, data: any, msg: ConsumeMessage) {
    switch (key) {
      case KEYS.NOTIFICATION_VIDEO_CONVERTED:
        await notificationVideoConvertedHandler(data, msg, this.channel);
        break;
      case KEYS.NOTIFICATION_VIDEO_NOT_CONVERTED:
        await notificationVideoNotConvertedHandler(data, msg, this.channel);
        break;
      case KEYS.USER_CREATED:
        await userCreatedHandler(data, msg, this.channel);
        break;
      case KEYS.FORGOT_PASSWORD:
        await forgotPasswordHandler(data, msg, this.channel);
        break;
      default:
        this.channel.nack(msg, false, false);
        break;
    }
  }
}
