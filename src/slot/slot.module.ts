import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slot]), CarModule],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}
