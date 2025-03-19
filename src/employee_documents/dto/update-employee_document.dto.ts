import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDocumentDto } from './create-employee_document.dto';

export class UpdateEmployeeDocumentDto extends PartialType(CreateEmployeeDocumentDto) {}
