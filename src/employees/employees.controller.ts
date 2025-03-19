import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, NotFoundException, UseInterceptors } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { BcryptHelper } from 'src/utils/bcrypt.helper';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor()) // Permite recibir datos de FormData
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {


    //validar que el empleado no tenga un email ya registrado
    const employeeByEmail = await this.employeesService.findByEmail(createEmployeeDto.email);
    
    // Validar que el dni no esté registrado
    const employeeByDni = await this.employeesService.findByDni(createEmployeeDto.dni);

    if (employeeByEmail) {
      throw new BadRequestException({ status: 'error', data: null, message: 'El email ya está registrado' });
    }

    if (employeeByDni) {
      throw new BadRequestException({ status: 'error', data: null, message: 'El DNI ya está registrado' });
    }

    const hashedPassword = await BcryptHelper.hashPassword(createEmployeeDto.password);

    const newEmployee = {
      ...createEmployeeDto,
      password: hashedPassword,
      position: { id: createEmployeeDto.position_id },
    }

    const employee = await this.employeesService.create(newEmployee);

    if (!employee) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al crear empleado' });
    }
    return { status: 'ok', data: employee, message: 'Empleado creado con éxito' };
  }

  @Post('/search')
  @UseInterceptors(AnyFilesInterceptor()) // Permite recibir datos de FormData
  async search(@Body() search: { input: string; status: 'A' | 'I' | '' }) {
     
      const employees = await this.employeesService.search(search.input, search.status);
      return { status: 'ok', data: employees, message: 'Lista de empleados obtenida con éxito' };

  }

  @Get()
  async findAll() {
    const employees = await this.employeesService.findAll();
    return { status: 'ok', data: employees, message: 'Lista de empleados obtenida con éxito' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    const employee = await this.employeesService.findOne(+id);
    if (!employee) {
      throw new NotFoundException({ status: 'error', data: null, message: 'Empleado no encontrado' });
    }
    return { status: 'ok', data: employee, message: 'Empleado encontrado' };
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {

    const dataUpdatedEmployee = {
      ...updateEmployeeDto,
      position: { id: updateEmployeeDto.position_id },
    }

    const updatedEmployee = await this.employeesService.update(+id, dataUpdatedEmployee);
    if (!updatedEmployee) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al actualizar empleado' });
    }
    return { status: 'ok', data: updatedEmployee, message: 'Empleado actualizado con éxito' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    
    const deleted = await this.employeesService.remove(+id);
    
    if (!deleted) {
      throw new BadRequestException({ status: 'error',  message: 'Empleado no encontrado' });
    }
    return { status: 'ok', message: 'Empleado eliminado con éxito' };
  }
}
