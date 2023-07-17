import { ObjectId } from 'mongodb';
import { NotificationTypeEnum } from '../enum/notification-type.enum';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notification {
  @ApiProperty({
    description: 'ObjectId as Notification Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
    nullable: false,
  })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({
    description: 'Type of Notification',
    example: 'Register Car Successfully',
    nullable: false,
  })
  @Column({ nullable: false })
  type: NotificationTypeEnum;

  @ApiProperty({
    description: 'Notification owner',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
    nullable: false,
  })
  @Column({ nullable: false })
  toCustomer: ObjectId;

  @ApiProperty({
    description: 'Description of Notification',
    example: 'Register Car Successfully',
    nullable: false,
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    description: 'Is Notification New',
    example: true,
    nullable: false,
  })
  @Column({ nullable: false })
  newNotification: boolean;
}
