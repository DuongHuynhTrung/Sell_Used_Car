import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUrl,
} from 'class-validator';
import { GenderEnum } from 'src/user/enum/gender.enum';
import { RoleEnum } from 'src/user/enum/role.enum';

export class SignUpDto {
  @ApiProperty({
    description: 'Full Name of User',
    example: 'Huynh Duong',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Date of Birth',
    example: '2001-02-22',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({
    description: 'Address of User',
    example: 'Tp. Thủ Đức, Tp. Hồ Chí Minh',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Gender of User',
    example: 'Male',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiProperty({
    description: 'Phone number of User',
    example: '0838323403',
    nullable: false,
    uniqueItems: true,
  })
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Email of User',
    example: 'trungduong22021619@gmail.com',
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of User',
    example: '123456',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Url image of User',
    example:
      'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/327289318_1901932446843118_789342237429371693_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ie7RpU-i4I4AX8aGpyb&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDtaGSwvXURIPPTj2k-5mEAPF1wVpd-mly2L6BJkMY4aw&oe=64B4C725',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imgUrl: string;

  @ApiProperty({
    description: 'Role of account: Customer/Owner/Manager',
    example: 'Customer',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
