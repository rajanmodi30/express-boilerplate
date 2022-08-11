import AWS from "aws-sdk";

export class S3 {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static async getSignedUrl(
    key: string,
    ContentType: string
  ): Promise<any> {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      signatureVersion: "v4",
    });

    const url = await s3.getSignedUrl("putObject", {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Expires: Number(process.env.S3_SIGNED_URL_EXPIRE_SECONDS),
      ContentType: ContentType,
    });
    return { key: `${process.env.S3_BASE_URL}/${key}`, url: url };
  }
}
