
import { ConfigModule } from '@nestjs/config';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

/* Modulos */
import { EmployeesModule } from './employees/employees.module';
import { PositionsModule } from './positions/positions.module';
import { TypeDocumentsModule } from './type_documents/type_documents.module';
import { EmployeeDocumentsModule } from './employee_documents/employee_documents.module';

/* Middlewares */
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CommonModule } from './common/common.module';

/* ORM */
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/* dataSourceOptions */
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [

    ConfigModule.forRoot(), // Cargar variables de entorno desde .env

    TypeOrmModule.forRoot(dataSourceOptions),

    PositionsModule,
    EmployeesModule,
    TypeDocumentsModule,
    EmployeeDocumentsModule,

    CommonModule
  ],
})
export class AppModule implements NestModule {

  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'employees',
      method: RequestMethod.ALL,
    });
  }
}
