import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  autoMaker: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  minPrice: number;

  @IsNumber()
  @IsNotEmpty()
  maxPrice: number;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsNumber()
  @IsNotEmpty()
  yearOfManufacture: number;

  @IsNumber()
  @IsNotEmpty()
  otherFacilities: number[];

  @IsString()
  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  @IsString()
  userId: string;
}
