import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EmployeeDocument } from 'src/employee_documents/entities/employee_document.entity';

@Entity({ name: 'type_document' })
export class TypeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => EmployeeDocument, (employeeDocument) => employeeDocument.typeDocument)
  documents: EmployeeDocument[];
}
