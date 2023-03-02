import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CatBreedDto } from './dto/CatBreed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatBreedEntity } from './entities/catBreedEntity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    private readonly axios: HttpService,
    @InjectRepository(CatBreedEntity)
    private readonly catRepository: Repository<CatBreedEntity>,
  ) {}

  async createCatBreed(catBreedDto: CatBreedDto): Promise<CatBreedDto> {
    const { name, breedGroup, weight, weightType } = catBreedDto;
    const savedCatBreed = await this.catRepository.find({
      where: { name },
    });

    if (savedCatBreed.length != 0) {
      throw new BadRequestException(
        undefined,
        'Cat breed with this name is already registered',
      );
    }

    const catBreedToSave: CatBreedEntity = {
      id: uuid(),
      name,
      breedGroup,
      weight,
      weightType,
    };

    await this.catRepository.save(catBreedToSave);

    return catBreedToSave;
  }

  async getAllCatBreeds(): Promise<CatBreedDto[]> {
    const catBreeds = await this.catRepository.find();
    return catBreeds.map((c) => CatBreedDto.fromEntity(c));
  }

  async getCatBreedById(id: string): Promise<CatBreedDto> {
    const catBreed = await this.catRepository.findOneBy({ id });
    return CatBreedDto.fromEntity(catBreed);
  }

  async deleteCatBreed(id: string): Promise<void> {
    await this.catRepository.delete(id);
  }

  async getCatBreedByName(name: string): Promise<CatBreedDto[]> {
    const catBreeds = await this.catRepository
      .createQueryBuilder('catBreed')
      .where('catBreed.name like :name', { name: `%${name}%` })
      .getMany();

    return catBreeds.map((c) => CatBreedDto.fromEntity(c));
  }
}
