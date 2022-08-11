import joi, { ObjectSchema } from "joi";

export const UpdateDeviceRequest: ObjectSchema = joi.object({
  fcmToken: joi.string(),
  metaData: joi.object(),
});
