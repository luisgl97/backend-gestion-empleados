import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { CommonModule } from 'src/common/common.module';
import { EmployeeDocumentsModule } from 'src/employee_documents/employee_documents.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), CommonModule, EmployeeDocumentsModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [TypeOrmModule]
})
export class EmployeesModule {}
