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
    description: 'Full Name of User Booking',
    example: 'Huỳnh Trùng Dương',
    nullable: false,
  })
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty({
    description: 'Phone of User Booking',
    example: '0838323403',
    nullable: false,
  })
  @Column({ nullable: false })
  phone: string;

  @ApiProperty({
    description: 'Note of Booking',
    example: 'Đến trễ 15p',
    nullable: true,
  })
  @Column({ nullable: true })
  note: string;

  @ApiProperty({
    description: 'Cancel note',
    example: 'Bận việc đột xuất',
    nullable: true,
  })
  @Column({ nullable: true })
  cancelNote: string;

  @ApiProperty({
    description: 'Booking Status',
    example: 'Pending',
    nullable: true,
  })
  @Column({ nullable: false, default: false })
  status: BookingStatusEnum;
}
