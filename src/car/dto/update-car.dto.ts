import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  autoMaker: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  minPrice: number;

  @IsNumber()
  @IsOptional()
  maxPrice: number;

  @IsString()
  @IsOptional()
  fuel: string;

  @IsString()
  @IsOptional()
  transmission: string;

  @IsNumber()
  @IsOptional()
  yearOfManufacture: number;

  @IsNumber()
  @IsOptional()
  otherFacilities: number[];

  @IsString()
  @IsOptional()
  images: string[];
}
