import { Module } from '@nestjs/common';
import { TypeDocumentsService } from './type_documents.service';
import { TypeDocumentsController } from './type_documents.controller';

@Module({
  controllers: [TypeDocumentsController],
  providers: [TypeDocumentsService],
})
export class TypeDocumentsModule {}
