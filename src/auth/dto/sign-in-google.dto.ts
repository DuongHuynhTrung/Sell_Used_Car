import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInGoogleDto {
  @ApiProperty({
    description: 'Full Name of Google account',
    example: 'Huỳnh Trùng Dương',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Email address of Google account',
    example: 'trungduong22021619@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Image URL of Google account',
    example:
      'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/327289318_1901932446843118_789342237429371693_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BeiAIAjSiwkAX85xvEF&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDvRVeU1Ru3LmY-GDTsv2jO9PvnJUAGlQmU-d1byLz9fw&oe=64B8BBA5',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  imgUrl: string;
}
