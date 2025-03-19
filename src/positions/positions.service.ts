import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {

  
    constructor(
      @InjectRepository(Position)
      private positionsRepository: Repository<Position>,
    ) {}

  create(createPositionDto: CreatePositionDto) {

    console.log('createPositionDto',createPositionDto)
    const newPosition = this.positionsRepository.create(createPositionDto);

    return this.positionsRepository.save(newPosition);
  }

  async findAll() {
    return await this.positionsRepository.find();
  }

  async findOne(id: number) {
    return await this.positionsRepository.findOneBy({id});
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {

    const position = await this.findOne(id);

    return this.positionsRepository.save({...position, ...updatePositionDto});
  }

  async remove(id: number) {
    const position = await this.findOne(id);

    if (!position) {
      throw new Error(`Position with id ${id} not found`);
    }

    return this.positionsRepository.remove(position);
  }
}
