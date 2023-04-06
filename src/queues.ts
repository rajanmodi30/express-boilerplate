import { Message } from "@aws-sdk/client-sqs";
import { PushNotificationSend } from "./app/jobs/PushNotificationSend";
import { sendWithDefaultTemplateEmail } from "./app/mails/DefaultMail";
import { sendForgotPasswordEmail } from "./app/mails/ForgotPasswordMail";
import { Sqs } from "./libs/sqs";
import {
  FORGOT_PASSWORD_QUEUE_NAME,
  MAIL_SEND_QUEUE_NAME,
  SEND_PUSH_QUEUE_NAME,
} from "./utils/utils";

const queues = [
  {
    queueName: FORGOT_PASSWORD_QUEUE_NAME,
    handleMessage: async (message: Message) => {
      await sendForgotPasswordEmail(JSON.parse(message.Body ?? ""));
    },
  },
  {
    queueName: SEND_PUSH_QUEUE_NAME,
    handleMessage: async (message: Message) => {
      await PushNotificationSend(JSON.parse(message.Body ?? ""));
    },
  },
  {
    queueName: MAIL_SEND_QUEUE_NAME,
    handleMessage: async (message: Message) => {
      await sendWithDefaultTemplateEmail(JSON.parse(message.Body ?? ""));
    },
  },
];

async function startQueues() {
  for (let queue of queues) {
    const { queueName, handleMessage } = queue;

    const app = await Sqs.subscriberMessage(queueName, handleMessage);

    app.on("error", (err) => {
      console.error(err.message);
      app.start();
    });

    app.on("processing_error", (err) => {
      console.error(err.message);
    });

    app.start();
  }
}

startQueues();
