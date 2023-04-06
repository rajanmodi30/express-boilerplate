import { env } from "../env";
import {
  ALLOWED_FILE_TYPES,
  ALLOWED_IMAGE_TYPE,
  ALLOWED_VIDEO_TYPE,
  UPLOAD_TYPES,
} from "./types";

export const queueConnection = {
  connection: {
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
  },
};

export const pagination = (
  totalCount: number,
  perPage: number,
  page: number
) => {
  return {
    total: totalCount,
    per_page: perPage,
    current_page: page,
    last_page: Math.ceil(totalCount / perPage),
  };
};

export const randomPasswordGenerator = () => {
  return Math.random().toString(36).slice(-8);
};

export const validFileTypes = (type: UPLOAD_TYPES) => {
  if (type === UPLOAD_TYPES.IMAGE) {
    return ALLOWED_IMAGE_TYPE;
  } else if (type === UPLOAD_TYPES.VIDEO) {
    return ALLOWED_VIDEO_TYPE;
  } else if (type === UPLOAD_TYPES.FILE) {
    return ALLOWED_FILE_TYPES;
  }
  return [];
};

export const STORAGE_PATH = env.app.root_dir + "/storage/uploads";

export const FORGOT_PASSWORD_QUEUE_NAME = "forgot-password";

export const SEND_PUSH_QUEUE_NAME = "send-push";

export const MAIL_SEND_QUEUE_NAME = "mail-send";
