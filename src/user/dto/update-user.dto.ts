import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsNumberString,
  IsString,
} from 'class-validator';
import { GenderEnum } from '../enum/gender.enum';
export class UpdateUserDto {
  @ApiProperty({
    description: 'Full Name of User',
    example: 'Huynh Duong',
    nullable: false,
  })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'Date of Birth',
    example: '22/02/2001',
    nullable: false,
  })
  @IsDateString()
  @IsOptional()
  dob: string;

  @ApiProperty({
    description: 'Address of User',
    example: 'Tp. Thủ Đức, Tp. Hồ Chí Minh',
    nullable: false,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Gender of User',
    example: 'Male',
    nullable: false,
  })
  @IsString()
  @IsOptional()
  gender: GenderEnum;

  @ApiProperty({
    description: 'Phone number of User',
    example: '0838323403',
    nullable: false,
    uniqueItems: true,
  })
  @IsNumberString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Url image of User',
    example:
      'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/327289318_1901932446843118_789342237429371693_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ie7RpU-i4I4AX8aGpyb&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDtaGSwvXURIPPTj2k-5mEAPF1wVpd-mly2L6BJkMY4aw&oe=64B4C725',
    nullable: false,
  })
  @IsString()
  @IsOptional()
  imgUrl: string;

  constructor(
    fullName: string,
    gender: GenderEnum,
    imgUrl: string,
    dob: string,
    address: string,
  ) {
    this.fullName = fullName;
    this.gender = gender;
    this.imgUrl = imgUrl;
    this.dob = dob;
    this.address = address;
  }
}
