import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CatBreedDto } from './dto/CatBreed.dto';
import { IsString, IsUUID } from 'class-validator';
import {
  CatBreedSearchRequest,
  SearchField,
} from './dto/CatBreedSearchRequest';

class IdParam {
  @IsUUID()
  id: string;
}

class NameParam {
  @IsString()
  name: string;
}

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllCatBreeds(): Promise<CatBreedDto[]> {
    return this.appService.getAllCatBreeds();
  }

  @Get(':id')
  getCatBreedById(@Param() params: IdParam): Promise<CatBreedDto> {
    return this.appService.getCatBreedById(params.id);
  }

  @Delete(':id')
  deleteCatBreed(@Param() params: IdParam): Promise<void> {
    return this.appService.deleteCatBreed(params.id);
  }

  @Get('/name/:name')
  getCatBreedByName(@Param() params: NameParam): Promise<CatBreedDto[]> {
    return this.appService.getCatBreedByName(params.name);
  }

  @Post('/search')
  searchCatBreeds(@Body() searchRequest: CatBreedSearchRequest) {
    return this.appService.search(searchRequest);
  }

  @Post()
  createCatBreed(@Body() catBreed: CatBreedDto): Promise<CatBreedDto> {
    return this.appService.createCatBreed(catBreed);
  }
}
