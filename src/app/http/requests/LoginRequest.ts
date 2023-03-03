import { Devices } from "@prisma/client";
import { nativeEnum, object, string, z } from "zod";

export const LoginRequest = object({
  email: string().email(),
  password: string(),
  deviceType: nativeEnum(Devices),
  metaData: object({}).optional(),
  fcmToken: string().optional(),
});

export type LoginRequest = z.infer<typeof LoginRequest>;
