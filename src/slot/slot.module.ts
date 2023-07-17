import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Car, Notification])],
  controllers: [SlotController],
  providers: [SlotService, CarService, NotificationService],
})
export class SlotModule {}
