import { Module } from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { EmployeeDocumentsController } from './employee_documents.controller';

@Module({
  controllers: [EmployeeDocumentsController],
  providers: [EmployeeDocumentsService],
})
export class EmployeeDocumentsModule {}
