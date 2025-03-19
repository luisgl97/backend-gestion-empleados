import { Employee } from 'src/employees/entities/employee.entity';
import { TypeDocument } from 'src/type_documents/entities/type_document.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee_document' })
export class EmployeeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.documents)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => TypeDocument, (typeDocument) => typeDocument.documents)
  @JoinColumn({ name: 'type_document_id' })
  typeDocument: TypeDocument;

  @Column({ type: 'varchar', length: 255 })
  file_path: string;
}
