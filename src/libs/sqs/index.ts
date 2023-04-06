import { env } from "../../env";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Producer } from "sqs-producer";
import { randomUUID } from "crypto";
import { logger } from "../../app/providers/logger";
import { Consumer } from "sqs-consumer";
import { sqsHandleMessage } from "../../utils/types";

export class Sqs {
  static client: SQSClient;

  constructor() {
    Sqs.client = new SQSClient({
      region: env.aws.region,
      credentials: {
        accessKeyId: env.aws.accessKey,
        secretAccessKey: env.aws.secretAccessKey,
      },
    });
  }

  public static async publishMessage(
    queueName: string,
    body: any
  ): Promise<void> {
    const queueUrl = `https://sqs.${env.aws.region}.amazonaws.com/${env.aws.accountId}/${env.node}.${queueName}`;

    const producer = Producer.create({
      queueUrl,
      region: env.aws.region,
      sqs: this.client,
    });

    const message = await producer.send({
      id: randomUUID(),
      body: JSON.stringify(body),
    });

    logger.info(`message sent ${message}`);
    producer.queueSize().then((size) => {
      console.log(`There are ${size} messages on the queue already.`);
    });
  }

  public static async subscriberMessage(
    queueName: string,
    handleMessage: sqsHandleMessage
  ) {
    const queueUrl = `https://sqs.${env.aws.region}.amazonaws.com/${env.aws.accountId}/${env.node}.${queueName}`;

    return Consumer.create({
      queueUrl,
      handleMessage,
      sqs: this.client,
    });
  }
}
