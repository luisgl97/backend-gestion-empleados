import { Injectable } from '@nestjs/common';
import { CreateTypeDocumentDto } from './dto/create-type_document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type_document.dto';
import { TypeDocument } from './entities/type_document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeDocumentsService {
  constructor(
    @InjectRepository(TypeDocument)
    private typeDocumentsRepository: Repository<TypeDocument>,
  ) {}

  async create(createTypeDocumentDto: CreateTypeDocumentDto): Promise<TypeDocument | null> {
    try {
      const newTypeDocument = this.typeDocumentsRepository.create(createTypeDocumentDto);
      return await this.typeDocumentsRepository.save(newTypeDocument);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<TypeDocument[]> {
    try {
      return await this.typeDocumentsRepository.find();
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<TypeDocument | null> {
    try {
      return await this.typeDocumentsRepository.findOne({
        where: { id },
        relations: ['documents'],
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<TypeDocument | null> {
    try {
      const typeDocument = await this.typeDocumentsRepository.preload({ id, ...updateTypeDocumentDto });
      if (!typeDocument) return null;
      return await this.typeDocumentsRepository.save(typeDocument);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.typeDocumentsRepository.delete(id);
      
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
