import { Car } from './entities/car.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { RoleEnum } from 'src/user/enum/role.enum';

@ApiTags('Car')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign Up new Car' })
  @ApiCreatedResponse({
    description: 'Created Car object as response',
    type: Car,
  })
  @ApiBadRequestResponse({
    description: 'The license plate was already created.',
  })
  @ApiNotFoundResponse({
    description: 'User id not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.OWNER)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: 'Get all Car' })
  @ApiOkResponse({
    description: 'The car has been successfully retrieved.',
    type: [Car],
  })
  @ApiNotFoundResponse({
    description: 'No cars found in the repository.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @ApiOperation({ summary: 'Get a car by License Plate' })
  @ApiOkResponse({
    description: 'The car has been successfully retrieved.',
    type: [Car],
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':licensePlate')
  findOne(@Param('licensePlate') licensePlate: string) {
    return this.carService.findOne(licensePlate);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Car by License Plate' })
  @ApiOkResponse({
    description: 'Update Car Successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.OWNER)
  @Patch(':licensePlate')
  update(
    @Param('licensePlate') licensePlate: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(licensePlate, updateCarDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Car by License Plate' })
  @ApiOkResponse({
    description: 'Delete Car Successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.OWNER)
  @Delete(':licensePlate')
  remove(@Param('licensePlate') licensePlate: string) {
    return this.carService.remove(licensePlate);
  }
}
