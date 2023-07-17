import { ObjectId } from 'mongodb';
import { SlotEnum } from 'src/slot/enum/slot.enum';
import { BookingStatusEnum } from '../enum/booking-status.enum';

export class Booking {
  customer_id: ObjectId;
  car_id: ObjectId;
  slotBooking: SlotEnum;
  date: Date;
  status: BookingStatusEnum;
}
