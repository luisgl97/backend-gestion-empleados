import { EmployeeDocument } from 'src/employee_documents/entities/employee_document.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Position } from 'src/positions/entities/position.entity';
import { TypeDocument } from 'src/type_documents/entities/type_document.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'rrhh',
      migrations: ['dist/db/migrations/*.js'],
      entities: ['dist/**/*.entity.js'],
      /* entities: [Position, TypeDocument, Employee, EmployeeDocument], */
      synchronize: true
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;