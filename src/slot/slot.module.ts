import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Car])],
  controllers: [SlotController],
  providers: [SlotService, CarService],
})
export class SlotModule {}
