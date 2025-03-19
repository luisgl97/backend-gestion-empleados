import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(private readonly employeeDocumentsService: EmployeeDocumentsService) {}

  @Post()
  create(@Body() createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    return this.employeeDocumentsService.create(createEmployeeDocumentDto);
  }

  @Get()
  findAll() {
    return this.employeeDocumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDocumentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDocumentDto: UpdateEmployeeDocumentDto) {
    return this.employeeDocumentsService.update(+id, updateEmployeeDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDocumentsService.remove(+id);
  }
}
