import { CarService } from './../car/car.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Slot } from './entities/slot.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private slotRepository: MongoRepository<Slot>,
  ) {}

  // async create(createSlotDto: CreateSlotDto) {
  //   const dateBooked = moment(createSlotDto.date);
  //   const now = moment();
  //   if (dateBooked.isBefore(now)) {
  //     throw new BadRequestException('Date must equal or after Now');
  //   }
  //   const car = await this.carService
  //   if (!car) {
  //     throw new NotFoundException('No Car found!');
  //   }
  //   const isSlotExist = await this.slotRepository.findOneBy({
  //     date: dateBooked,
  //     car_id: car._id,
  //   });

  //   if (isSlotExist) {
  //     isSlotExist.slotStored.push(createSlotDto.slot);
  //   }
  // }

  findAll() {
    return `This action returns all slot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
