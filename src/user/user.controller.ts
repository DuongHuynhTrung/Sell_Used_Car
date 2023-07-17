import { Car } from 'src/car/entities/car.entity';
import { Roles } from './../auth/role.decorator';
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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { RoleEnum } from './enum/role.enum';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@UseGuards(JwtGuard)
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all User' })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: [User],
  })
  @ApiNotFoundResponse({
    description: 'No users found in the repository.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: [User],
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Update User by email' })
  @ApiOkResponse({
    description: 'Update User Successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.updateUserInfo(email, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User by email' })
  @ApiOkResponse({
    description: 'Delete User Successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete(':email')
  remove(@Param('email') email: string): Promise<string> {
    return this.userService.deleteUser(email);
  }

  @ApiOperation({ summary: 'Get Favorite Cars' })
  @ApiOkResponse({
    description: 'List of Favorite Car',
    type: [Car],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('favorites/all')
  getFavoriteCar(@GetUser() user: User): Promise<Car[]> {
    return this.userService.getFavoriteCars(user);
  }

  @ApiOperation({ summary: 'Add Favorite Car' })
  @ApiOkResponse({
    description: 'List of Favorite Car',
    type: [Car],
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Post('/favorites/:licensePlate')
  addFavoriteCar(
    @Param('licensePlate') licensePlate: string,
    @GetUser() user: User,
  ): Promise<Car[]> {
    return this.userService.addFavoriteCar(licensePlate, user);
  }

  @ApiOperation({ summary: 'Remove All Favorite Car' })
  @ApiOkResponse({
    description: 'List of Favorite Car',
    type: [Car],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('/favorites/removeAll')
  removeAllFavoriteCar(@GetUser() user: User): Promise<string> {
    return this.userService.removeAllFavoriteCar(user);
  }

  @ApiOperation({ summary: 'Remove Favorite Car' })
  @ApiOkResponse({
    description: 'List of Favorite Car',
    type: [Car],
  })
  @ApiNotFoundResponse({
    description: 'Car not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('/favorites/:licensePlate')
  removeFavoriteCar(
    @Param('licensePlate') licensePlate: string,
    @GetUser() user: User,
  ): Promise<Car[]> {
    return this.userService.removeFavoriteCar(licensePlate, user);
  }
}
