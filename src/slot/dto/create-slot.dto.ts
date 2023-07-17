import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SlotEnum } from '../enum/slot.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSlotDto {
  @ApiProperty({
    description: 'Date booked',
    example: '2023-07-13',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Slot has booked',
    example: '[Slot1,Slot2,Slot3]',
  })
  @IsEnum(SlotEnum)
  @IsNotEmpty()
  slot: SlotEnum;

  @ApiProperty({
    description: 'License Plate of Car',
    example: 'H5-12562',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
