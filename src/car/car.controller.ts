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
import { CarStatusEnum } from './enum/car-status.enum';

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
  createCar(@Body() createCarDto: CreateCarDto, @GetUser() user: User) {
    return this.carService.createCar(createCarDto, user);
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
  getAllCar() {
    return this.carService.getCars();
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
  getAllCarOfUser(@GetUser() user: User) {
    return this.carService.findAllOfUser(user);
  }

  @ApiOperation({ summary: 'Get a car by License Plate' })
  @ApiOkResponse({
    description: 'The car has been successfully retrieved.',
    type: Car,
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':licensePlate')
  getCarByLicensePlate(@Param('licensePlate') licensePlate: string) {
    return this.carService.getCarByLicensePlate(licensePlate);
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
  updateCarInfo(
    @Param('licensePlate') licensePlate: string,
    @Body() updateCarDto: UpdateCarDto,
    @GetUser() user: User,
  ): Promise<string> {
    return this.carService.updateCarInfo(licensePlate, updateCarDto, user);
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
  deleteCar(
    @Param('licensePlate') licensePlate: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.carService.deleteCar(licensePlate, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin confirm Car by License Plate' })
  @ApiOkResponse({
    description: 'The car has been successfully retrieved.',
    type: Car,
  })
  @ApiNotFoundResponse({
    description: 'Could not find car with licensePlate.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Patch('adminConfirm/:licensePlate')
  changeCarStatus(
    @Param('licensePlate') licensePlate: string,
    @Param('status') status: CarStatusEnum,
  ): Promise<Car> {
    return this.carService.changeCarStatus(licensePlate, status);
  }
}
