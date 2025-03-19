import { EmployeeDocument } from 'src/employee_documents/entities/employee_document.entity';
import { Position } from 'src/positions/entities/position.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

enum EmployeeStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

@Entity({ name: 'employee' }) // Especifica el nombre de la tabla
export class Employee {
  @PrimaryGeneratedColumn()
  id: number; // PK con auto-incremento

  @Column({ type: 'varchar', length: 255, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToOne(() => Position, (position) => position.employees) 
  @JoinColumn({ name: 'position_id' }) 
  position: Position;


  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salary: number;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status: string; // Estado 'A' (Activo) o 'I' (Inactivo)

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => EmployeeDocument, (employeeDocument) => employeeDocument.employee)
  documents: EmployeeDocument[];
}
