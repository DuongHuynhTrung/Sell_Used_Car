import { User } from './../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Slot } from 'src/slot/entities/slot.entity';
import { SlotService } from 'src/slot/slot.service';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';
import { UserService } from 'src/user/user.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Slot, Car, User, Notification])],
  controllers: [BookingController],
  providers: [
    BookingService,
    SlotService,
    CarService,
    UserService,
    NotificationService,
  ],
})
export class BookingModule {}
