import { object, string, z } from "zod";

export const UpdateDeviceRequest = object({
  fcmToken: string(),
  metaData: object({}).optional(),
});

export type UpdateDeviceRequest = z.infer<typeof UpdateDeviceRequest>;
