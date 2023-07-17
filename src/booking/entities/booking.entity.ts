import { ObjectId } from 'mongodb';
import { SlotEnum } from 'src/slot/enum/slot.enum';
import { BookingStatusEnum } from '../enum/booking-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Booking {
  @ApiProperty({
    description: 'ObjectId as Booking Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @ObjectIdColumn({ nullable: false })
  _id: ObjectId;

  @ApiProperty({
    description: 'Email Of Customer',
    example: 'trungduong22021619@gmail.com',
    nullable: false,
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    description: 'License Plate of Car',
    example: 'H5-51256',
    nullable: false,
  })
  @Column({ nullable: false })
  licensePlate: string;

  @ApiProperty({
    description: 'Booking Slot',
    example: 'Slot1',
    nullable: false,
  })
  @Column({ nullable: false })
  slot: SlotEnum;

  @ApiProperty({
    description: 'Booking Date',
    example: '2023-07-17',
    nullable: false,
  })
  @Column({ nullable: false })
  date: Date;

  @ApiProperty({
    description: 'Booking Status',
    example: 'Pending',
    nullable: true,
  })
  @Column({ nullable: false, default: false })
  status: BookingStatusEnum;
}
