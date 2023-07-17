import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car])],
  controllers: [UserController],
  providers: [UserService, CarService],
})
export class UserModule {}
