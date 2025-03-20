import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { BcryptHelper } from 'src/utils/bcrypt.helper';

import { ValidateDynamicDocumentsPipe } from './pipes/validate-dynamic-documents.pipe';
import { Multer } from 'multer';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { EmployeeDocumentsService } from 'src/employee_documents/employee_documents.service';
import { extractPublicId } from 'src/utils/extractPublicId';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly employeeDocumentsService: EmployeeDocumentsService
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor()) // Permite recibir datos de FormData
  async create(
    @Body(new ValidateDynamicDocumentsPipe())
    createEmployeeDto: CreateEmployeeDto,
    @UploadedFiles() files: Array<Multer.File>, // Captura los archivos
  ) {
   
    //validar que el empleado no tenga un email ya registrado
    const employeeByEmail = await this.employeesService.findByEmail(
      createEmployeeDto.email,
    );

    // Validar que el dni no esté registrado
    const employeeByDni = await this.employeesService.findByDni(
      createEmployeeDto.dni,
    );

    if (employeeByEmail) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'El email ya está registrado',
      });
    }

    if (employeeByDni) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'El DNI ya está registrado',
      });
    }

    const folderName = `${createEmployeeDto.first_name}_${createEmployeeDto.last_name}_${createEmployeeDto.dni}`;
   
    let uploadedFiles:{type_document_id:number; url: string}[] = [];

    if(files.length !=0){
      uploadedFiles =
      await this.cloudinaryService.uploadMultipleFilesToFolder(
        files,
        folderName,
      );

    }
   

    const hashedPassword = await BcryptHelper.hashPassword(
      createEmployeeDto.password,
    );

    const newEmployee = {
      ...createEmployeeDto,
      password: hashedPassword,
      position: { id: createEmployeeDto.position_id },
    };

    const employee = await this.employeesService.create(newEmployee);

    if (!employee) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'Error al crear empleado',
      });
    }

    // Guardar en la tabla employee_document las url de los archivos
    if(uploadedFiles.length>0){
      
      const documents = uploadedFiles.map(document => ((
        {
          file_path: document.url,
          employee_id: employee.id,
          type_document_id: document.type_document_id,
        }
      )))

      // insertar cada document de documents en employeeDocumentsService

      const savedDocuments = await this.employeeDocumentsService.createBulk(documents);
    }

    return {
      status: 'ok',
      data: employee,
      message: 'Empleado creado con éxito',
    };
  }

  @Post('/search')
  @UseInterceptors(AnyFilesInterceptor()) // Permite recibir datos de FormData
  async search(@Body() search: { input: string; status: 'A' | 'I' | '' }) {
    const employees = await this.employeesService.search(
      search.input,
      search.status,
    );
    return {
      status: 'ok',
      data: employees,
      message: 'Lista de empleados obtenida con éxito',
    };
  }

  @Get()
  async findAll() {
    const employees = await this.employeesService.findAll();
    return {
      status: 'ok',
      data: employees,
      message: 'Lista de empleados obtenida con éxito',
    };
  }

  @Post("/view-pdf")
  async viewPdfEmployee(@Body() search: { employee_id: number; document_type_id: number }) {
    
    const employee = await this.employeeDocumentsService.findByEmployeeIdAndTypeDocument(search.employee_id, search.document_type_id);

    if(!employee){
      return { status: 'error', data: null, message:'Url no encontrada'}
    }

    return { status: 'ok', data: employee.file_path, message: 'Url encontrado' };
  }

  @Post("/delete-pdf")
  async DeletePdfEmployee(@Body() search: { employee_id: number; document_type_id: number }) {
    
    const employee = await this.employeeDocumentsService.findByEmployeeIdAndTypeDocument(search.employee_id, search.document_type_id);

    if(!employee){
      return { status: 'error', message:'Url no encontrada'}
    }

    const publicId = extractPublicId(employee?.file_path || "");
    // Eliminar cloudinary
    const deletedCloudinary = await this.cloudinaryService.deleteFile(publicId);
 
    const deleted = await this.employeeDocumentsService.remove(employee.id);
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(+id);
    if (!employee) {
      throw new NotFoundException({
        status: 'error',
        data: null,
        message: 'Empleado no encontrado',
      });
    }
    return { status: 'ok', data: employee, message: 'Empleado encontrado' };
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFiles() files: Array<Multer.File>, // Captura los archivos
  ) {

    const folderName = `${updateEmployeeDto.first_name}_${updateEmployeeDto.last_name}_${updateEmployeeDto.dni}`;
  
    let uploadedFiles:{type_document_id:number; url: string}[] = [];

    if(files.length !=0){
      uploadedFiles =
      await this.cloudinaryService.uploadMultipleFilesToFolder(
        files,
        folderName,
      );

    }

    const dataUpdatedEmployee = {
      ...updateEmployeeDto,
      position: { id: updateEmployeeDto.position_id },
    };

    const updatedEmployee = await this.employeesService.update(
      +id,
      dataUpdatedEmployee,
    );
    if (!updatedEmployee) {
      throw new BadRequestException({
        status: 'error',
        data: null,
        message: 'Error al actualizar empleado',
      });
    }

    // **Actualizar los documentos del empleado si se subieron nuevos archivos**
  if (uploadedFiles.length > 0) {
    // 🔹 Obtener documentos actuales del empleado
    const existingDocuments = await this.employeeDocumentsService.findByEmployeeId(+id);

    // 🔹 Eliminar documentos antiguos si existen
    if (existingDocuments.length > 0) {
      await this.employeeDocumentsService.deleteByEmployeeId(+id);
    }

    // 🔹 Insertar los nuevos documentos
    const documents = uploadedFiles.map(document => ({
      file_path: document.url,
      employee_id: +id,
      type_document_id: document.type_document_id,
    }));

    await this.employeeDocumentsService.createBulk(documents);
  }

    return {
      status: 'ok',
      data: updatedEmployee,
      message: 'Empleado actualizado con éxito',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.employeesService.remove(+id);

    if (!deleted) {
      throw new BadRequestException({
        status: 'error',
        message: 'Empleado no encontrado',
      });
    }
    return { status: 'ok', message: 'Empleado eliminado con éxito' };
  }
}
