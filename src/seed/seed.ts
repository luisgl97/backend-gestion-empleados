// Crear un seed para llenar las tablas

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { BcryptHelper } from '../utils/bcrypt.helper';
import { CreatePositionDto } from '../positions/dto/create-position.dto';
import { CreateTypeDocumentDto } from '../type_documents/dto/create-type_document.dto';

import { EmployeesController } from '../employees/employees.controller';
import { PositionsController } from '../positions/positions.controller';
import { TypeDocumentsController } from '../type_documents/type_documents.controller';

async function seed() {


    //Eliminar toda la data primero antes de insertarlo

    

  const app = await NestFactory.createApplicationContext(AppModule);

  const employeesController = app.get(EmployeesController);
  const positionsController = app.get(PositionsController);
  const typeDocumentsController = app.get(TypeDocumentsController);

  const positionsRepository = app.get('PositionRepository');
  const typeDocumentsRepository = app.get('TypeDocumentRepository');
  const employeesRepository = app.get('EmployeeRepository');

  try {

    // Reiniciar IDs y eliminar datos
    await employeesRepository.query('TRUNCATE TABLE employee RESTART IDENTITY CASCADE');
    await positionsRepository.query('TRUNCATE TABLE position RESTART IDENTITY CASCADE');
    await typeDocumentsRepository.query('TRUNCATE TABLE type_document RESTART IDENTITY CASCADE');
  
  } catch (error) {
    console.error('Error al eliminar datos existentes:', error.message);
    process.exit(1);
  }

  const listPositions: CreatePositionDto[] = [
    { name: 'Gerente' },
    { name: 'Subgerente' },
    { name: 'Jefe de área' },
    { name: 'Desarrollador Full Stack' },
    { name: 'Desarrollador Frontend' },
    { name: 'Desarrollador Backend' },
    { name: 'Diseñador UX/UI' },
    { name: 'Analista de datos' },
  ];

  const listTypeDocuments: CreateTypeDocumentDto[] = [
    { name: 'DNI' },
    { name: 'Licencia de conducir' },
    { name: 'CV' },
  ];

  const listEmployees: CreateEmployeeDto[] = [
    {
      dni: '12345678',
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@gmail.com',
      password: await BcryptHelper.hashPassword('juan'),
      position_id: 1,
      salary: 2500.5,
      status: 'A',
    },
    {
      dni: '87654321',
      first_name: 'María',
      last_name: 'Gómez',
      email: 'maria.gomez@gmail.com',
      password: 'maria',
      position_id: 2,
      salary: 3200.75,
      status: 'A',
    },
    {
      dni: '11223344',
      first_name: 'Carlos',
      last_name: 'López',
      email: 'carlos.lopez@gmail.com',
      password: 'carlos',
      position_id: 3,
      salary: 2800.0,
      status: 'I',
    },
  ];

  for (const position of listPositions) {
    try {
      await positionsController.create(position);
    } catch (error) {
      console.error(`Error al crear posición ${position.name}:`, error.message);
    }
  }

  for (const typeDocument of listTypeDocuments) {
    try {
      await typeDocumentsController.create(typeDocument);
    } catch (error) {
      console.error(
        `Error al crear tipo de documento ${typeDocument.name}:`,
        error.message,
      );
    }
  }

  for (const employee of listEmployees) {
    try {
      await employeesController.create(employee, []);
    } catch (error) {
      console.error(
        `Error al crear empleado ${employee.email}:`,
        error.message,
      );
    }
  }

  await app.close();
}

seed()
  .then(() => {
    console.log('Seeding completado.');
    process.exit();
  })
  .catch((error) => {
    console.error('Error en el seeding:', error);
    process.exit(1);
  });
