import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  @IsArray()
  @IsNotEmpty()
  otherFacilities: number[];

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  @IsString()
  userId: string;
}