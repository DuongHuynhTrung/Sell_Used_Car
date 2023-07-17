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
  ) {}

  async create(createCarDto: CreateCarDto, user: User): Promise<Car> {
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
    return car;
  }

  async findAll(): Promise<Car[]> {
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

  async findOne(licensePlate: string): Promise<Car> {
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

  async update(
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

  async remove(licensePlate: string, user: User): Promise<string> {
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

  async confirmCar(licensePlate: string): Promise<Car> {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate ${licensePlate}`,
        );
      }
      car.status = CarStatusEnum.CONFIRM;
      await this.carRepository.save(car);
      return car;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
