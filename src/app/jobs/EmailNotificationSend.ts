import { Sqs } from "../../libs/sqs";
import { sendMailQueueData } from "../../utils/types";
import { MAIL_SEND_QUEUE_NAME } from "../../utils/utils";
import { sendWithDefaultTemplateEmail } from "../mails/DefaultMail";
import { logger } from "../providers/logger";

export const QueueEmailNotificationSend = async (data: sendMailQueueData) => {
  const queue = await Sqs.publishMessage(MAIL_SEND_QUEUE_NAME, data);
};

export const EmailNotificationSend = async (job: sendMailQueueData) => {
  const response = await sendWithDefaultTemplateEmail(job);
  logger.info(`Email notification sent with job params ${JSON.stringify(job)}`);
};
