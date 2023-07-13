import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/car/entities/car.entity';
import { Column, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';
import { SlotEnum } from '../enum/slot.enum';

export class Slot {
  @ApiProperty({
    description: 'ObjectId as Slot Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({
    description: 'Date booked',
    example: '2023-07-13',
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Slot has booked',
    example: '[Slot1,Slot2,Slot3]',
  })
  @Column()
  slotStored: SlotEnum[];

  @ApiProperty({
    description: 'CarId has booked',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @ManyToOne(() => Car)
  car_id: Car;
}
