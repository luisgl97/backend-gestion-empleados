import { Module } from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { EmployeeDocumentsController } from './employee_documents.controller';
import { EmployeeDocument } from './entities/employee_document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeDocument])],
  controllers: [EmployeeDocumentsController],
  providers: [EmployeeDocumentsService],
  exports: [TypeOrmModule]
})
export class EmployeeDocumentsModule {}
