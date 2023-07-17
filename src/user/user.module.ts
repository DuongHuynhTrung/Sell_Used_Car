import { Notification } from 'src/notification/entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, Notification])],
  controllers: [UserController],
  providers: [UserService, CarService, NotificationService],
})
export class UserModule {}
