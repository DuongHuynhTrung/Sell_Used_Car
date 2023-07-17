import { Car } from 'src/car/entities/car.entity';
import { Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { SlotEnum } from '../enum/slot.enum';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class Slot {
  @ApiProperty({
    description: 'ObjectId as Slot Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
    nullable: false,
  })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({
    description: 'Date of booking',
    example: '2023-07-15',
    nullable: false,
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Array of slots booking',
    example: '[Slot1, Slot2, Slot3]',
    nullable: false,
  })
  @Column()
  slotStored: SlotEnum[];

  @ApiProperty({
    description: 'User booking',
    type: () => Car,
    nullable: false,
  })
  @ManyToOne(() => Car)
  carId: Car;
}
