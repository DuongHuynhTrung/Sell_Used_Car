import { CarService } from './../car/car.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Slot } from './entities/slot.entity';
import { ObjectId } from 'mongodb';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private slotRepository: MongoRepository<Slot>,

    @InjectRepository(Car)
    private carRepository: MongoRepository<Slot>,
  ) {}

  async create(createSlotDto: CreateSlotDto) {
    const dateBooked = moment(createSlotDto.date);
    const now = moment();
    if (dateBooked.isBefore(now)) {
      throw new BadRequestException('Date must equal or after Now');
    }
    const car = await this.carRepository.findOneBy({
      _id: createSlotDto.car_id,
    });
    if (!car) {
      throw new NotFoundException('No Car found!');
    }
    const isSlotExist = await this.slotRepository.findOneBy({
      date: dateBooked,
      carId: car._id,
    });

    if (isSlotExist) {
      isSlotExist.slotStored.push(createSlotDto.slot);
      try {
        await this.slotRepository.save(isSlotExist);
      } catch (error) {
        throw new InternalServerErrorException(
          'Something went wrong when saving slot',
        );
      }
      return isSlotExist;
    } else {
      const slot = this.slotRepository.create(createSlotDto);
      if (!slot) {
        throw new InternalServerErrorException(
          'Something went wrong when creating slot',
        );
      }
      return slot;
    }
  }

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
