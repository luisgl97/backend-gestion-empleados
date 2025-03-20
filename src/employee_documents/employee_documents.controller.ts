import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeDocumentsService } from './employee_documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { extractPublicId } from 'src/utils/extractPublicId';

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(
    private readonly employeeDocumentsService: EmployeeDocumentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  async create(@Body() createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    const employeeDocument = await this.employeeDocumentsService.create(
      createEmployeeDocumentDto,
    );
    if (!employeeDocument) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'Error al crear documento del empleado',
      });
    }
    return {
      status: 'ok',
      data: employeeDocument,
      message: 'Documento del empleado creado con éxito',
    };
  }

  @Get()
  async findAll() {
    const employeeDocuments = await this.employeeDocumentsService.findAll();
    return {
      status: 'ok',
      data: employeeDocuments,
      message: 'Lista de documentos de empleados obtenida con éxito',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employeeDocument = await this.employeeDocumentsService.findOne(+id);
    if (!employeeDocument) {
      throw new NotFoundException({
        status: 'error',
        data: null,
        message: 'Documento del empleado no encontrado',
      });
    }
    return {
      status: 'ok',
      data: employeeDocument,
      message: 'Documento del empleado encontrado',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDocumentDto: UpdateEmployeeDocumentDto,
  ) {
    const updatedEmployeeDocument = await this.employeeDocumentsService.update(
      +id,
      updateEmployeeDocumentDto,
    );
    if (!updatedEmployeeDocument) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'Error al actualizar documento del empleado',
      });
    }
    return {
      status: 'ok',
      data: updatedEmployeeDocument,
      message: 'Documento del empleado actualizado con éxito',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    const document = await this.employeeDocumentsService.findOne(+id);
 
    const publicId = extractPublicId(document?.file_path || "");
    // Eliminar cloudinary
     await this.cloudinaryService.deleteFile(publicId);

    const deleted = await this.employeeDocumentsService.remove(+id);
    if (!deleted) {
      throw new BadRequestException({
        status: 'error',
        message: 'Error al eliminar documento del empleado',
      });
    }
    return {
      status: 'ok',
      message: 'Documento del empleado eliminado con éxito',
    };
  }
}
