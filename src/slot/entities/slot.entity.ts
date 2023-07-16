import { Car } from 'src/car/entities/car.entity';
import { Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { SlotEnum } from '../enum/slot.enum';
import { ObjectId } from 'mongodb';

export class Slot {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  date: Date;

  @Column()
  slotStored: SlotEnum[];

  @ManyToOne(() => Car)
  carId: Car;
}
