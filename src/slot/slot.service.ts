import { CarService } from './../car/car.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './entities/slot.entity';
@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,

    private readonly carService: CarService,
  ) {}

  async createSlot(createSlotDto: CreateSlotDto): Promise<Slot> {
    const car = await this.carService.getCarByLicensePlate(
      createSlotDto.licensePlate,
    );
    if (!car) {
      throw new NotFoundException('No Car found!');
    }
    const isSlotExist = await this.slotRepository.findOneBy({
      licensePlate: car.licensePlate,
      date: createSlotDto.date,
    });
    if (isSlotExist) {
      if (isSlotExist.slotStored.includes(createSlotDto.slot)) {
        throw new BadRequestException('Slot has already booked');
      }
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
      slot.slotStored = [];
      slot.slotStored.push(createSlotDto.slot);
      await this.slotRepository.save(slot);
      return slot;
    }
  }

  async findAllSlot() {
    try {
      const slots = await this.slotRepository.find();
      if (!slots || slots.length === 0) {
        throw new NotFoundException('No slots found');
      }
      return slots;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getSlotByLicensePlateAndDate(
    date: Date,
    licensePlate: string,
  ): Promise<Slot> {
    if (!date || !licensePlate) {
      throw new BadRequestException('All fields must be provided');
    }
    try {
      const isSlotExist = await this.slotRepository.findOneBy({
        licensePlate,
        date,
      });
      if (!isSlotExist) {
        throw new NotFoundException(
          `Could not find slot with ${licensePlate} and ${date}`,
        );
      }
      return isSlotExist;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async removeSlot(createSlotDto: CreateSlotDto) {
    try {
      const isSlotExist = await this.slotRepository.findOneBy({
        licensePlate: createSlotDto.licensePlate,
        date: createSlotDto.date,
      });
      if (!isSlotExist) {
        throw new NotFoundException(
          `Could not find slot with ${createSlotDto.licensePlate}} and ${createSlotDto.date}`,
        );
      }
      if (isSlotExist.slotStored.includes(createSlotDto.slot)) {
        const removeSlot = isSlotExist.slotStored.filter(
          (slot) => slot !== createSlotDto.slot,
        );
        isSlotExist.slotStored = removeSlot;
      }
      await this.slotRepository.save(isSlotExist);
      return isSlotExist;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
