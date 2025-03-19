import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    const position = await this.positionsService.create(createPositionDto);
    if (!position) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al crear posición' });
    }
    return { status: 'ok', data: position, message: 'Posición creada con éxito' };
  }

  @Get()
  async findAll() {
    const positions = await this.positionsService.findAll();
    return { status: 'ok', data: positions, message: 'Lista de posiciones obtenida con éxito' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const position = await this.positionsService.findOne(+id);
    if (!position) {
      throw new NotFoundException({ status: 'error', data: null, message: 'Posición no encontrada' });
    }
    return { status: 'ok', data: position, message: 'Posición encontrada' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    const updatedPosition = await this.positionsService.update(+id, updatePositionDto);
    if (!updatedPosition) {
      throw new BadRequestException({ status: 'error', data: null, message: 'Error al actualizar posición' });
    }
    return { status: 'ok', data: updatedPosition, message: 'Posición actualizada con éxito' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.positionsService.remove(+id);
    if (!deleted) {
      throw new BadRequestException({ status: 'error',  message: 'Error al eliminar posición' });
    }
    return { status: 'ok', message: 'Posición eliminada con éxito' };
  }
}

