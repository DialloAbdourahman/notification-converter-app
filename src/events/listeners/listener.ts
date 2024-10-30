import { EXCHANGES, KEYS, Listener, QUEUES } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { notificationVideoConvertedHandler } from "./handlers/NotificationVideoConvertedHandler";
import { notificationVideoNotConvertedHandler } from "./handlers/NotificationVideoNotConvertedHandler";

export class NotificationServiceListener extends Listener {
  keys: KEYS[] = [
    KEYS.NOTIFICATION_VIDEO_CONVERTED,
    KEYS.NOTIFICATION_VIDEO_NOT_CONVERTED,
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
      default:
        this.channel.nack(msg, false, false);
        break;
    }
  }
}
