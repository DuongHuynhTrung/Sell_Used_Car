import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly carService: CarService,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (!users || users.length === 0) {
        throw new Error(`No users found in the repository`);
      }
      return users;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        email,
      });
      if (!user) {
        throw new Error(`User ${email} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateUserInfo(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException(`User ${email} not found`);
      }
      if (user.phone === updateUserDto.phone) {
        const updateUserDtoWithoutPhone = new UpdateUserDto(
          updateUserDto.fullName,
          updateUserDto.gender,
          updateUserDto.imgUrl,
          updateUserDto.dob,
          updateUserDto.address,
        );
        const userUpdate = await this.userRepository.update(
          { email },
          updateUserDtoWithoutPhone,
        );
        if (!userUpdate) {
          throw new Error('Something went wrong updating user');
        }
        if (userUpdate.affected > 0) {
          return 'User updated successfully';
        } else {
          return 'Nothing changed';
        }
      }
      const userUpdate = await this.userRepository.update(
        { email },
        updateUserDto,
      );
      if (!userUpdate) {
        throw new Error('Something went wrong updating user');
      }
      if (userUpdate.affected > 0) {
        return 'User updated successfully';
      } else {
        return 'Nothing changed';
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(email: string): Promise<string> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error(`User ${email} not found`);
      }
      const deleteUser = await this.userRepository.delete({ email });
      if (!deleteUser) {
        throw new InternalServerErrorException(
          'Something went wrong when deleting user',
        );
      }
      if (deleteUser.affected > 0) {
        return 'Delete user successfully';
      } else {
        return 'Delete user failed';
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addFavoriteCar(licensePlate: string, user: User): Promise<Car[]> {
    try {
      const car = await this.carService.findOne(licensePlate);

      if (!user.favoriteCars || user.favoriteCars.length === 0) {
        user.favoriteCars = [];
        user.favoriteCars.push(car);
      } else {
        const isExist = user.favoriteCars.find(
          (car) => car.licensePlate === licensePlate,
        );
        if (isExist) {
          throw new BadRequestException('Car is already in the favorites');
        }
        user.favoriteCars.push(car);
      }

      await this.userRepository.save(user);

      return user.favoriteCars;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeFavoriteCar(licensePlate: string, user: User): Promise<Car[]> {
    try {
      await this.carService.findOne(licensePlate);

      if (!user.favoriteCars || user.favoriteCars.length === 0) {
        throw new InternalServerErrorException('Favorite Car is empty');
      }

      const favorites = user.favoriteCars.filter(
        (car) => car.licensePlate !== licensePlate,
      );

      user.favoriteCars = favorites;

      await this.userRepository.save(user);

      return user.favoriteCars;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeAllFavoriteCar(user: User): Promise<string> {
    try {
      if (!user.favoriteCars || user.favoriteCars.length === 0) {
        throw new InternalServerErrorException('Favorite Car is empty');
      }

      user.favoriteCars = [];

      await this.userRepository.save(user);

      return 'Remove All Favorite Car';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getFavoriteCars(user: User): Promise<Car[]> {
    try {
      if (!user.favoriteCars || user.favoriteCars.length === 0) {
        throw new InternalServerErrorException('Favorite Car is empty');
      }

      return user.favoriteCars;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
