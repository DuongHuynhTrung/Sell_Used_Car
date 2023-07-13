import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotService {
  create(createSlotDto: CreateSlotDto) {
    return 'This action adds a new slot';
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
