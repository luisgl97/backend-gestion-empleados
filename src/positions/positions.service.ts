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

  async create(createPositionDto: CreatePositionDto): Promise<Position | null> {
    try {
      const newPosition = this.positionsRepository.create(createPositionDto);
      return await this.positionsRepository.save(newPosition);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<Position[]> {
    try {
      return await this.positionsRepository.find();
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<Position | null> {
    try {
      return await this.positionsRepository.findOne({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto): Promise<Position | null> {
    try {
      const position = await this.positionsRepository.preload({ id, ...updatePositionDto });
      if (!position) return null;
      return await this.positionsRepository.save(position);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.positionsRepository.delete(id);
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
