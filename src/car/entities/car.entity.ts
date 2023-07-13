import { ObjectId } from 'mongodb';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class Car {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  licensePlate: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  autoMaker: string;

  @Column({ nullable: false })
  model: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  minPrice: number;

  @Column({ nullable: false })
  maxPrice: number;

  @Column({ nullable: false })
  fuel: string;

  @Column({ nullable: false })
  transmission: string;

  @Column({ nullable: false })
  yearOfManufacture: number;

  @Column({ nullable: false })
  otherFacilities: number[];

  @Column({ nullable: false })
  images: string[];

  @ManyToOne(() => User, (user) => user.cars, { eager: true })
  user: User;
}
