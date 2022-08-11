import { MessagingPayload } from "firebase-admin/lib/messaging/messaging-api";

export type sendPushNotificationType = {
  fcmTokens: string[];
  messagePayload: MessagingPayload;
};
