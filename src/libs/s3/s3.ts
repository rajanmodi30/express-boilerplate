import { env } from "../../env";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3 {
  static client: S3Client;

  constructor() {
    S3.client = new S3Client({
      region: env.aws.region,
      credentials: {
        accessKeyId: env.aws.accessKey,
        secretAccessKey: env.aws.secretAccessKey,
      },
    });
  }

  public static async getSignedUrl(
    key: string,
    ContentType: string
  ): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: env.aws.bucket,
      Key: key,
      ContentType: ContentType,
      ACL: "public-read",
    });

    const url = await getSignedUrl(S3.client, command, { expiresIn: 3600 });

    return {
      key: ` https://${env.aws.bucket}.s3.${env.aws.region}.amazonaws.com/${key}`,
      url: url,
    };
  }
}
