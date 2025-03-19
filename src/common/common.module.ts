import { Global, Module } from '@nestjs/common';
/* import { S3Service } from './service/s3.service';
import { FileUploadService } from './service/file-upload.service';
 */
@Global() // Decorador que hace que el módulo sea global
@Module({
 /*  providers: [S3Service, FileUploadService],
  exports: [S3Service, FileUploadService] */
})
export class CommonModule {}