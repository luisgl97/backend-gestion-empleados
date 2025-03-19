/* import { Injectable, BadRequestException } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { Express } from "express";

@Injectable()
export class FileUploadService {
  constructor(private readonly s3Service: S3Service) {}

  async validateAndUploadFiles(
    files: Express.Multer.File[],
    allowedMimeTypes: string[],
    folder: string
  ): Promise<{ id: string; url: string }[]> {
    if (!files || files.length === 0) return [];

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`El tipo de archivo ${file.mimetype} no está permitido.`);
      }
    }

    return await Promise.all(
      files.map(async (file) => {
        const url = await this.s3Service.uploadFile(file, folder);
        return { id: file.originalname, url };
      })
    );
  }
}
 */