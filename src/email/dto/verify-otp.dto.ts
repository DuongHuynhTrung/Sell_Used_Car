import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Otp user input',
    example: 524461,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty({
    description: 'Otp expired timestamp',
    example: '2023-07-19T18:52:28.828Z',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  otpExpired: Date;

  @ApiProperty({
    description: 'Otp the system send to user',
    example: 524461,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  otpStored: number;
}
