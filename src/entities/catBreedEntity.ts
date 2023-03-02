import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catBreed')
export class CatBreedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  breedGroup: string;

  @Column()
  weight: number;

  @Column()
  weightType: string;
}
