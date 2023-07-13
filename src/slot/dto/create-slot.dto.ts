import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { SlotEnum } from '../enum/slot.enum';

export class CreateSlotDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @IsNotEmpty()
  slotStored: SlotEnum[];

  @IsString()
  @IsNotEmpty()
  car_id: string;
}
