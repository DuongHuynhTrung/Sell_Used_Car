import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCarDto {
  @ApiProperty({
    description: 'Full Name of Car',
    example: 'Honda City 2023',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'License Plate of Car',
    example: '68C1-10958',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    description: 'Description of Car',
    example: 'The Car of family',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'AutoMaker of Car',
    example: 'Honda',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  autoMaker: string;

  @ApiProperty({
    description: 'Model of Car',
    example: 'Honda City',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Category of Car',
    example: 'Sedan',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Min Price of Car',
    example: '300000000',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  minPrice: number;

  @ApiProperty({
    description: 'Max Price of Car',
    example: '400000000',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  maxPrice: number;

  @ApiProperty({
    description: 'Fuel of Car',
    example: 'Gasoline',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  fuel: string;

  @ApiProperty({
    description: 'Transmission of Car',
    example: 'Manual',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({
    description: 'Year of Manufacturer of Car',
    example: '2023',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  yearOfManufacture: number;

  @ApiProperty({
    description: 'Other Facilities of Car',
    example: '[1,4,5,7]',
    nullable: false,
  })
  @IsArray()
  @IsNotEmpty()
  otherFacilities: number[];

  @ApiProperty({
    description: 'Images of Car',
    example:
      '[https://i2-vnexpress.vnecdn.net/2023/07/05/Honda-CIty-2023-VnE-9792.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=_mXEIKnIbYd2Nazbf-1bPQ&t=image,https://danchoioto.vn/wp-content/uploads/2023/03/gia-xe-honda-city.jpg]',
    nullable: false,
  })
  @IsArray()
  @IsNotEmpty()
  images: string[];
}
