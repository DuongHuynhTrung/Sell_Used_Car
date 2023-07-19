import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationTypeEnum } from '../enum/notification-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Type of Notification',
    example: 'Register Car Successfully',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiProperty({
    description: 'Description of Notification',
    example: 'Register Car Successfully',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
