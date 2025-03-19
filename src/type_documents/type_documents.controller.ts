import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TypeDocumentsService } from './type_documents.service';
import { CreateTypeDocumentDto } from './dto/create-type_document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type_document.dto';

@Controller('type-documents')
export class TypeDocumentsController {
  constructor(private readonly typeDocumentsService: TypeDocumentsService) {}

  @Post()
  async create(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
    const typeDocument = await this.typeDocumentsService.create(createTypeDocumentDto);
    if (!typeDocument) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al crear tipo de documento' });
    }
    return { status: 'ok', data: typeDocument, message: 'Tipo de documento creado con éxito' };
  }

  @Get()
  async findAll() {
    const typeDocuments = await this.typeDocumentsService.findAll();
    return { status: 'ok', data: typeDocuments, message: 'Lista de tipos de documento obtenida con éxito' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const typeDocument = await this.typeDocumentsService.findOne(+id);
    if (!typeDocument) {
      throw new NotFoundException({ status: 'error', data: null, message: 'Tipo de documento no encontrado' });
    }
    return { status: 'ok', data: typeDocument, message: 'Tipo de documento encontrado' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTypeDocumentDto: UpdateTypeDocumentDto) {
    const updatedTypeDocument = await this.typeDocumentsService.update(+id, updateTypeDocumentDto);
    if (!updatedTypeDocument) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al actualizar tipo de documento' });
    }
    return { status: 'ok', data: updatedTypeDocument, message: 'Tipo de documento actualizado con éxito' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.typeDocumentsService.remove(+id);
    if (!deleted) {
      throw new BadRequestException({ status: 'error', message: 'Error al eliminar tipo de documento' });
    }
    return { status: 'ok', message: 'Tipo de documento eliminado con éxito' };
  }
}
