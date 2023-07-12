import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  constructor(
    fullName: string,
    gender: string,
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
