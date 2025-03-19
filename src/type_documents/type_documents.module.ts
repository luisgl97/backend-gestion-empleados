import { Module } from '@nestjs/common';
import { TypeDocumentsService } from './type_documents.service';
import { TypeDocumentsController } from './type_documents.controller';
import { TypeDocument } from './entities/type_document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDocument])],
  controllers: [TypeDocumentsController],
  providers: [TypeDocumentsService],
  exports: [TypeOrmModule]
})
export class TypeDocumentsModule {}
