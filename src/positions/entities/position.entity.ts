import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity({ name: 'position' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number; // Clave primaria con autoincremento

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string; 

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[]
}
