import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { SlotEnum } from '../enum/slot.enum';

export class CreateSlotDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @IsNotEmpty()
  slot: SlotEnum;

  @IsString()
  @IsNotEmpty()
  car_id: string;
}
