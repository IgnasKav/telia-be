import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum SearchField {
  name = 'name',
  breedGroup = 'breedGroup',
}

export class CatBreedSearchRequest {
  @IsString()
  searchText: string;

  @IsEnum(SearchField)
  sortField: SearchField;

  @IsString()
  sortDirection: 'ASC' | 'DESC';

  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;
}
