import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { MongoRepository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: MongoRepository<Car>,

    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
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

    const user = await this.userRepository.findOneBy({
      _id: new ObjectId(createCarDto.userId),
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createCarDto.userId} does not exist`,
      );
    }
    car.user = user;
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

  async update(licensePlate: string, updateCarDto: UpdateCarDto) {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate ${licensePlate}`,
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

  async remove(licensePlate: string) {
    try {
      const car = await this.carRepository.findOneBy({ licensePlate });
      if (!car) {
        throw new NotFoundException(
          `Could not find car with licensePlate ${licensePlate}`,
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
}
