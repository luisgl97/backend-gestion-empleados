import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee | null> {
    try {
      const newEmployee = this.employeesRepository.create(createEmployeeDto);
      return await this.employeesRepository.save(newEmployee);
    } catch (error) {
   
      return null;
    }
  }

  async findByEmail(email: string): Promise<Employee | null> {
    try {
      return await this.employeesRepository.findOne({ where: { email } });
    } catch (error) {
      return null;
    }
  }

  async findByDni(dni: string): Promise<Employee | null> {
    try {
      return await this.employeesRepository.findOne({ where: { dni } });
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeesRepository.find({
        relations: ['position', 'documents'],
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<Employee | null> {
    try {
      return await this.employeesRepository.findOne({
        where: { id },
        relations: ['position', 'documents'],
      });
    } catch (error) {
      return null;
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    try {
      const employee = await this.employeesRepository.preload({
        id,
        ...updateEmployeeDto,
      });
      if (!employee) return null;
      return await this.employeesRepository.save(employee);
    } catch (error) {
      return null;
    }
  }
  async remove(id: number): Promise<boolean> {
    try {
      //cambiar el status a I
      const result = await this.employeesRepository.update(id, {
        status: 'I',
      });

      if (result.affected === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async search(input: string, status?: 'A' | 'I' | ''): Promise<Employee[]> {
    try {
      const whereCondition = [
        { first_name: ILike(`%${input}%`) },
        { last_name: ILike(`%${input}%`) },
        { dni: ILike(`%${input}%`) },
      ];
  
      // Si `status` tiene un valor, generamos un nuevo array con `status`
      const where = status
        ? whereCondition.map((condition) => ({ ...condition, status }))
        : whereCondition;
  
      return await this.employeesRepository.find({
        where,
        relations: ['position', 'documents'],
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
}
