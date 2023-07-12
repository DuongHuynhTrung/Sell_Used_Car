import {
  Controller,
  Get,
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
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.updateUserInfo(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string): Promise<string> {
    return this.userService.deleteUser(email);
  }
}
