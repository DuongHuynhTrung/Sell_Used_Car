import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class Car {
  @ApiProperty({
    description: 'ObjectId as Car Id',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
  })
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({
    description: 'Full Name of Car',
    example: 'Honda City 2023',
    nullable: false,
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'License Plate of Car',
    example: '68C1-10958',
    nullable: false,
  })
  @Column({ nullable: false, unique: true })
  licensePlate: string;

  @ApiProperty({
    description: 'Description of Car',
    example: 'The Car of family',
    nullable: false,
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    description: 'AutoMaker of Car',
    example: 'Honda',
    nullable: false,
  })
  @Column({ nullable: false })
  autoMaker: string;

  @ApiProperty({
    description: 'Model of Car',
    example: 'Honda City',
    nullable: false,
  })
  @Column({ nullable: false })
  model: string;

  @ApiProperty({
    description: 'Category of Car',
    example: 'Sedan',
    nullable: false,
  })
  @Column({ nullable: false })
  category: string;

  @ApiProperty({
    description: 'Min Price of Car',
    example: '300000000',
    nullable: false,
  })
  @Column({ nullable: false })
  minPrice: number;

  @ApiProperty({
    description: 'Max Price of Car',
    example: '400000000',
    nullable: false,
  })
  @Column({ nullable: false })
  maxPrice: number;

  @ApiProperty({
    description: 'Fuel of Car',
    example: 'Gasoline',
    nullable: false,
  })
  @Column({ nullable: false })
  fuel: string;

  @ApiProperty({
    description: 'Transmission of Car',
    example: 'Manual',
    nullable: false,
  })
  @Column({ nullable: false })
  transmission: string;

  @ApiProperty({
    description: 'Year of Manufacturer of Car',
    example: '2023',
    nullable: false,
  })
  @Column({ nullable: false })
  yearOfManufacture: number;

  @ApiProperty({
    description: 'Other Facilities of Car',
    example: '[1,4,5,7]',
    nullable: false,
  })
  @Column({ nullable: false })
  otherFacilities: number[];

  @ApiProperty({
    description: 'Images of Car',
    example:
      '[https://i2-vnexpress.vnecdn.net/2023/07/05/Honda-CIty-2023-VnE-9792.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=_mXEIKnIbYd2Nazbf-1bPQ&t=image,https://danchoioto.vn/wp-content/uploads/2023/03/gia-xe-honda-city.jpg]',
    nullable: false,
  })
  @Column({ nullable: false })
  images: string[];

  @ApiProperty({
    description: 'Has the car been sold or not',
    example: false,
    nullable: false,
  })
  @Column({ nullable: false, default: false })
  isSold: boolean;

  @ApiProperty({
    description: '_id of User of Car',
    example: new ObjectId('64aea612e3e3014d7e0431ce'),
    nullable: false,
  })
  user_id: ObjectId;
}
