import { Injectable } from '@nestjs/common';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDocument } from './entities/employee_document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeDocumentsService {
  constructor(
    @InjectRepository(EmployeeDocument)
    private employeeDocumentsRepository: Repository<EmployeeDocument>,
  ) {}

  async create(createEmployeeDocumentDto: CreateEmployeeDocumentDto): Promise<EmployeeDocument | null> {
    try {
      const newEmployeeDocument = this.employeeDocumentsRepository.create(createEmployeeDocumentDto);
      return await this.employeeDocumentsRepository.save(newEmployeeDocument);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<EmployeeDocument[]> {
    try {
      return await this.employeeDocumentsRepository.find({ relations: ['employee', 'typeDocument'] });
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<EmployeeDocument | null> {
    try {
      return await this.employeeDocumentsRepository.findOne({
        where: { id },
        relations: ['employee', 'typeDocument'],
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateEmployeeDocumentDto: UpdateEmployeeDocumentDto): Promise<EmployeeDocument | null> {
    try {
      const employeeDocument = await this.employeeDocumentsRepository.preload({ id, ...updateEmployeeDocumentDto });
      if (!employeeDocument) return null;
      return await this.employeeDocumentsRepository.save(employeeDocument);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.employeeDocumentsRepository.delete(id);
      if (result.affected === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
