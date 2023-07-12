import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':licensePlate')
  findOne(@Param('licensePlate') licensePlate: string) {
    return this.carService.findOne(licensePlate);
  }

  @Patch(':licensePlate')
  update(
    @Param('licensePlate') licensePlate: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(licensePlate, updateCarDto);
  }

  @Delete(':licensePlate')
  remove(@Param('licensePlate') licensePlate: string) {
    return this.carService.remove(licensePlate);
  }
}
