import { NotificationTypeEnum } from './../notification/enum/notification-type.enum';
import { CreateNotificationDto } from './../notification/dto/create-notification.dto';
import { NotificationService } from './../notification/notification.service';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CarStatusEnum } from './enum/car-status.enum';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    private readonly notificationService: NotificationService,
  ) {}

  async createCar(createCarDto: CreateCarDto, user: User): Promise<Car> {
    const isExistLicensePlate = await this.carRepository.findOneBy({
      licensePlate: createCarDto.licensePlate,
    });
    if (isExistLicensePlate) {
      throw new BadRequestException(`The license plate was already created`);
    }
    const car = this.carRepository.create(createCarDto);
    if (!car) {
      throw new InternalServerErrorException(
        'Something went wrong when creating car',
      );
    }

    if (!user) {
      throw new UnauthorizedException(`User Unauthorized`);
    }
    car.user_id = user._id;
    car.status = CarStatusEnum.PENDING;
    try {
      await this.carRepository.save(car);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    const createNotificationDto = new CreateNotificationDto();
    createNotificationDto.type = NotificationTypeEnum.REGISTER_CAR;
    createNotificationDto.description = `Create the Car with License Plate ${createCarDto.licensePlate} was Successful.`;
    try {
      await this.notificationService.createNotification(
        createNotificationDto,
        user._id,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return car;
  }

  async getCars(): Promise<Car[]> {
    try {
      const cars = await this.carRepository.find();
      if (!cars || cars.length === 0) {
        throw new Error(`No cars found`);
      }
      return cars;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAllOfUser(user: User): Promise<Car[]> {
    try {
      const cars = await this.carRepository.find({
        where: {
          user_id: user._id,
        },
      });
      if (!cars || cars.length === 0) {
        throw new Error(`No cars found`);
      }
      return cars;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getCarByLicensePlate(licensePlate: string): Promise<Car> {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate: ${licensePlate}`,
        );
      }
      return car;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateCarInfo(
    licensePlate: string,
    updateCarDto: UpdateCarDto,
    user: User,
  ): Promise<string> {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate ${licensePlate}`,
        );
      }
      if (car.user_id !== user._id) {
        throw new ForbiddenException(
          `You don't have permission to edit this car`,
        );
      }
      const updateCar = await this.carRepository.update(
        { licensePlate },
        updateCarDto,
      );
      if (updateCar.affected > 0) {
        return 'Update Car successfully';
      } else {
        return 'Update Car failed';
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCar(licensePlate: string, user: User): Promise<string> {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate ${licensePlate}`,
        );
      }
      if (car.user_id !== user._id) {
        throw new ForbiddenException(
          `You don't have permission to delete this car`,
        );
      }
      const deleteCar = await this.carRepository.delete({ licensePlate });
      if (deleteCar.affected > 0) {
        return 'Delete Car successfully';
      } else {
        return 'Delete Car failed';
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async changeCarStatus(
    licensePlate: string,
    status: CarStatusEnum,
  ): Promise<Car> {
    try {
      switch (status) {
        case CarStatusEnum.CONFIRM: {
          const car = await this.carRepository.findOneBy({ licensePlate });
          if (!car) {
            throw new NotFoundException(
              `Could not find car with licensePlate ${licensePlate}`,
            );
          }
          car.status = status;
          await this.carRepository.save(car);

          const createNotificationDto = new CreateNotificationDto();
          createNotificationDto.type = NotificationTypeEnum.CONFIRM_CAR;
          createNotificationDto.description = `The Car with License Plate ${car.licensePlate} is selling`;
          await this.notificationService.createNotification(
            createNotificationDto,
            car.user_id,
          );

          return car;
          break;
        }
        case CarStatusEnum.SOLD: {
          const car = await this.carRepository.findOneBy({ licensePlate });
          if (!car) {
            throw new NotFoundException(
              `Could not find car with licensePlate ${licensePlate}`,
            );
          }
          car.status = status;
          await this.carRepository.save(car);

          const createNotificationDto = new CreateNotificationDto();
          createNotificationDto.type = NotificationTypeEnum.SOLD_CAR;
          createNotificationDto.description = `The Car with License Plate ${car.licensePlate} had already been sold`;
          await this.notificationService.createNotification(
            createNotificationDto,
            car.user_id,
          );

          return car;
          break;
        }
        case CarStatusEnum.CANCELLED: {
          const car = await this.carRepository.findOneBy({ licensePlate });
          if (!car) {
            throw new NotFoundException(
              `Could not find car with licensePlate ${licensePlate}`,
            );
          }
          car.status = status;
          await this.carRepository.save(car);

          const createNotificationDto = new CreateNotificationDto();
          createNotificationDto.type = NotificationTypeEnum.CANCELLED_CAR;
          createNotificationDto.description = `The Car with License Plate ${car.licensePlate} has been refused for sale`;
          await this.notificationService.createNotification(
            createNotificationDto,
            car.user_id,
          );

          return car;
          break;
        }
        default: {
          throw new BadRequestException('Invalid Car status');
          break;
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
