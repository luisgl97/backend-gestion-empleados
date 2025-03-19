import { Injectable } from '@nestjs/common';
import { CreateTypeDocumentDto } from './dto/create-type_document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type_document.dto';

@Injectable()
export class TypeDocumentsService {
  create(createTypeDocumentDto: CreateTypeDocumentDto) {
    return 'This action adds a new typeDocument';
  }

  findAll() {
    return `This action returns all typeDocuments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeDocument`;
  }

  update(id: number, updateTypeDocumentDto: UpdateTypeDocumentDto) {
    return `This action updates a #${id} typeDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeDocument`;
  }
}
