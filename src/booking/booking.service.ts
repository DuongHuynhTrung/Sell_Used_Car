import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { CarService } from 'src/car/car.service';
import { SlotService } from 'src/slot/slot.service';
import { User } from 'src/user/entities/user.entity';
import { BookingStatusEnum } from './enum/booking-status.enum';
import { RoleEnum } from 'src/user/enum/role.enum';
import { ObjectId } from 'mongodb';
import { CreateSlotDto } from 'src/slot/dto/create-slot.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly carService: CarService,

    private readonly slotService: SlotService,
  ) {}
  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    try {
      await this.carService.getCarByLicensePlate(createBookingDto.licensePlate);
      const booking = this.bookingsRepository.create(createBookingDto);
      if (!booking) {
        throw new InternalServerErrorException(
          'Something went wrong when creating booking',
        );
      }
      booking.email = user.email;
      booking.status = BookingStatusEnum.SUCCESS;
      await this.slotService.createSlot(createBookingDto);
      await this.bookingsRepository.save(booking);
      return booking;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllBookings(user: User): Promise<Booking[]> {
    try {
      if (user.role === RoleEnum.ADMIN) {
        const bookings = await this.bookingsRepository.find();
        if (!bookings || bookings.length === 0) {
          throw new NotFoundException('System does not exist any booking');
        }
        return bookings;
      } else if (user.role === RoleEnum.USER) {
        const bookings = await this.bookingsRepository.find({
          where: {
            email: user.email,
          },
        });

        if (!bookings || bookings.length === 0) {
          throw new NotFoundException('User does not have any booking');
        }
        return bookings;
      } else {
        throw new BadRequestException('User Role is not available');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async changeBookingStatus(
    user: User,
    booking_id: string,
  ): Promise<Booking[]> {
    try {
      const booking = await this.bookingsRepository.findOneBy({
        _id: new ObjectId(booking_id),
      });
      if (!booking) {
        throw new NotFoundException(`Booking ${booking_id} not found`);
      }
      if (booking.email !== user.email) {
        throw new ForbiddenException(
          `You do not have permission to cancel this booking`,
        );
      }
      booking.status = BookingStatusEnum.CANCELED;
      await this.bookingsRepository.save(booking);

      const createSlotDto = new CreateSlotDto();
      createSlotDto.date = booking.date;
      createSlotDto.licensePlate = booking.licensePlate;
      createSlotDto.slot = booking.slot;

      await this.slotService.removeSlot(createSlotDto);

      const bookings = await this.findAllBookings(user);
      return bookings;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
