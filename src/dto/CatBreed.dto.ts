import { CatBreedEntity } from '../entities/catBreedEntity';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CatBreedDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  breedGroup: string;

  @IsNumber()
  weight: number;

  @IsString()
  weightType: string;

  static fromEntity(catBreed: CatBreedEntity): CatBreedDto {
    const dto: CatBreedDto = {
      id: catBreed.id,
      name: catBreed.name,
      breedGroup: catBreed.breedGroup,
      weight: catBreed.weight,
      weightType: catBreed.weightType,
    };

    return dto;
  }
}
