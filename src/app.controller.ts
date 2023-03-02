import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatBreedDto } from './dto/CatBreed.dto';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllCatBreeds(): Promise<CatBreedDto[]> {
    return this.appService.getAllCatBreeds();
  }

  @Get(':id')
  getCatBreedById(@Param() params): Promise<CatBreedDto> {
    return this.appService.getCatBreedById(params.id);
  }

  @Delete(':id')
  deleteCatBreed(@Param('id') id): Promise<void> {
    return this.appService.deleteCatBreed(id);
  }

  @Get('/name/:name')
  getCatBreedByName(@Param('name') name: string): Promise<CatBreedDto[]> {
    return this.appService.getCatBreedByName(name);
  }

  @Post()
  createCatBreed(@Body() catBreed: CatBreedDto): Promise<CatBreedDto> {
    return this.appService.createCatBreed(catBreed);
  }
}
