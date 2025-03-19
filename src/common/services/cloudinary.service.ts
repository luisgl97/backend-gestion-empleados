import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Multer } from 'multer';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFileToFolder(
    file: Multer.File,
    folderName: string,
    typeDocument: number
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    // Asegurarse de que los archivos se guarden en la carpeta "employees"
    const fullFolderPath = `employees/${folderName}`;

    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
            folder: fullFolderPath,
            resource_type: 'auto',
            type: 'upload', // Asegura que sea accesible
            access_mode: "public", // Asegurar que sea accesible
            public_id: `documento_${typeDocument}`, // Nombre del archivo sin extensión
            overwrite: true, 
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      ).end(file.buffer);
    });

    console.log('Resultado de la subida', uploadResult)

    return uploadResult.secure_url;
  }

  async uploadMultipleFilesToFolder(
    files: Multer.File[],
    folderName: string,
  ): Promise<{ type_document_id: number; url: string }[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se proporcionaron archivos');
    }

    const uploadPromises = files.map(async (file) => {

        const typeDocument = Number(file.fieldname.split("_")[1]);

      const url = await this.uploadFileToFolder(file, folderName, typeDocument);
      
      return { type_document_id: typeDocument , url };
    });

    return Promise.all(uploadPromises);
  }

  async deleteFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Resultado de la eliminación:', result);
      return result.result === 'ok'; // Retorna true si la eliminación fue exitosa
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw new BadRequestException('No se pudo eliminar el archivo');
    }
  }

    
}