import { Injectable } from '@nestjs/common';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';

@Injectable()
export class EmployeeDocumentsService {
  create(createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    return 'This action adds a new employeeDocument';
  }

  findAll() {
    return `This action returns all employeeDocuments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeDocument`;
  }

  update(id: number, updateEmployeeDocumentDto: UpdateEmployeeDocumentDto) {
    return `This action updates a #${id} employeeDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDocument`;
  }
}
