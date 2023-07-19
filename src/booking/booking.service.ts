import { NotificationTypeEnum } from './../notification/enum/notification-type.enum';
import { CreateNotificationDto } from './../notification/dto/create-notification.dto';
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
import { NotificationService } from 'src/notification/notification.service';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly carService: CarService,

    private readonly slotService: SlotService,

    private readonly notificationService: NotificationService,
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

      const createNotificationDto = new CreateNotificationDto();
      createNotificationDto.type = NotificationTypeEnum.CREATE_BOOKING;
      createNotificationDto.description = `Create Booking the car with License Plate ${createBookingDto.licensePlate} on ${createBookingDto.date} was successful.`;
      await this.notificationService.createNotification(
        createNotificationDto,
        user._id,
      );

      await this.bookingsRepository.save(booking);
      return booking;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllBookings(user: User): Promise<[Booking, Car][]> {
    try {
      if (user.role === RoleEnum.ADMIN) {
        const bookings = await this.bookingsRepository.find();
        if (!bookings || bookings.length === 0) {
          throw new NotFoundException('System does not exist any booking');
        }
        const cars = await this.carService.getCars();
        const response = [];
        bookings.forEach((booking) => {
          const car = cars.find(
            (car) => car.licensePlate === booking.licensePlate,
          );
          response.push({ ...booking, car });
        });
        return response;
      } else if (user.role === RoleEnum.USER) {
        const bookings = await this.bookingsRepository.find({
          where: {
            email: user.email,
          },
        });

        if (!bookings || bookings.length === 0) {
          throw new NotFoundException('User does not have any booking');
        }
        const cars = await this.carService.getCars();
        const response = [];
        bookings.forEach((booking) => {
          const car = cars.find(
            (car) => car.licensePlate === booking.licensePlate,
          );
          response.push({ ...booking, car });
        });
        return response;
      } else {
        throw new BadRequestException('User Role is not available');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async cancelBookingStatus(user: User, booking_id: string): Promise<Booking> {
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

      const createNotificationDto = new CreateNotificationDto();
      createNotificationDto.type = NotificationTypeEnum.CANCEL_BOOKING;
      createNotificationDto.description = `Cancel Booking the car with License Plate ${booking.licensePlate} on ${booking.date} was successful.`;
      await this.notificationService.createNotification(
        createNotificationDto,
        user._id,
      );

      return booking;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
