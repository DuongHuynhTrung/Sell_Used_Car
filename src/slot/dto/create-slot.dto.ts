import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { SlotEnum } from '../enum/slot.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class CreateSlotDto {
  @ApiProperty({
    description: 'Date booked',
    example: '2023-07-13',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Slot has booked',
    example: '[Slot1,Slot2,Slot3]',
  })
  @IsArray()
  @IsNotEmpty()
  slot: SlotEnum;

  @ApiProperty({
    description: 'CarId has booked',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @IsString()
  @IsNotEmpty()
  car_id: string;
}
