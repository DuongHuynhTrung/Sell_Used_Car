import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SlotEnum } from 'src/slot/enum/slot.enum';

export class CreateBookingDto {
  @ApiProperty({
    description: 'License Plate of Car',
    example: 'H5-51256',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @ApiProperty({
    description: 'Booking Slot',
    example: 'Slot1',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(SlotEnum)
  slot: SlotEnum;

  @ApiProperty({
    description: 'Booking Date',
    example: '2023-07-17',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
