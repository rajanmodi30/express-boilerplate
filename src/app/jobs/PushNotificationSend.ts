import { PushNotification } from "../../libs/push/push";
import { Sqs } from "../../libs/sqs";
import { sendFCMQueueData } from "../../utils/types";
import { SEND_PUSH_QUEUE_NAME } from "../../utils/utils";
import { logger } from "../providers/logger";

export const QueuePushNotificationSend = async (data: sendFCMQueueData) => {
  const queue = await Sqs.publishMessage(SEND_PUSH_QUEUE_NAME, data);
};

export const PushNotificationSend = async (job: sendFCMQueueData) => {
  console.log("send fcm");
  const push = new PushNotification({ tokens: job.fcmTokens });
  const response = await push.send(job.messagePayload);
  logger.info(
    `Push notification sent: ${response} with job params ${JSON.stringify(job)}`
  );
};
