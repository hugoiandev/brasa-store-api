import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import IS3Service from "../Interfaces/IS3Service";

class S3Service implements IS3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(s3Client: S3Client, bucketName: string) {
    this.s3Client = s3Client;
    this.bucketName = bucketName;
  }

  public async uploadFile(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    try {
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: "image/png",
      };

      const command = new PutObjectCommand(params);

      await this.s3Client.send(command);

      const urlFile = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;

      return urlFile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFile(fileName: string) {
    try {
      const command = new DeleteObjectCommand({
        Key: fileName,
        Bucket: this.bucketName,
      });

      await this.s3Client.send(command);
      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default S3Service;
