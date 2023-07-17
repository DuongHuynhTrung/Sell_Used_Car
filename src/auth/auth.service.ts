import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MongoRepository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { PayloadJwtDto } from './dto/payload-jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from 'src/user/enum/role.enum';
import { SignInGoogleDto } from './dto/sign-in-google.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<User> {
    if (!signUpDto.role || signUpDto.role === undefined) {
      signUpDto.role = RoleEnum.USER;
    }
    const user = this.userRepository.create(signUpDto);
    if (!user) {
      throw new BadRequestException('Something went wrong when creating user');
    }
    user.status = true;
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(signUpDto.password, salt);

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email or Phone has already existed');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepository.findOneBy({
        email: signInDto.email,
      });
      if (!user) {
        throw new Error(`User ${signInDto.email} does not exist`);
      }
      const checkPassword = await bcrypt.compare(
        signInDto.password,
        user.password,
      );
      if (!checkPassword) {
        throw new Error('Invalid password');
      }
      const payload: PayloadJwtDto = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signInGoogle(
    signInGoogleDto: SignInGoogleDto,
  ): Promise<{ accessToken: string }> {
    try {
      const isExist = await this.userRepository.findOneBy({
        email: signInGoogleDto.email,
      });
      if (isExist) {
        const payload: PayloadJwtDto = {
          fullName: isExist.fullName,
          email: isExist.email,
          role: RoleEnum.USER,
        };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      } else {
        const user = this.userRepository.create(signInGoogleDto);
        if (!user) {
          throw new InternalServerErrorException(
            'Something went wrong when creating user',
          );
        }
        user.status = true;
        user.role = RoleEnum.USER;
        await this.userRepository.save(user);

        const payload: PayloadJwtDto = {
          fullName: user.fullName,
          email: user.email,
          role: RoleEnum.USER,
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
