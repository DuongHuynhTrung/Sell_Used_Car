import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSlotLicensePlateDateDto {
  @ApiProperty({
    description: 'Date booked',
    example: '2023-07-13',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'License Plate of Car',
    example: 'H5-12562',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
