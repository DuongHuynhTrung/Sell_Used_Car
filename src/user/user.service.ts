import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        relations: {
          cars: true,
        },
      });
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
}
