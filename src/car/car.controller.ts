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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

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
  @Roles(RoleEnum.USER)
  @Post()
  create(@Body() createCarDto: CreateCarDto, @GetUser() user: User) {
    return this.carService.create(createCarDto, user);
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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('user')
  findAllOfUser(@GetUser() user: User) {
    return this.carService.findAllOfUser(user);
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
  @Roles(RoleEnum.USER)
  @Patch(':licensePlate')
  update(
    @Param('licensePlate') licensePlate: string,
    @Body() updateCarDto: UpdateCarDto,
    @GetUser() user: User,
  ): Promise<string> {
    return this.carService.update(licensePlate, updateCarDto, user);
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
  @Roles(RoleEnum.USER)
  @Delete(':licensePlate')
  remove(
    @Param('licensePlate') licensePlate: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.carService.remove(licensePlate, user);
  }
}
