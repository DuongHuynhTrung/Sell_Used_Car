import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Notification } from './entities/notification.entity';
import { ObjectId } from 'mongodb';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('Notification')
@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new Notification' })
  @ApiCreatedResponse({
    description: 'Created Notification object as response',
    type: Notification,
  })
  @ApiBadRequestResponse({
    description: 'The license plate was already created.',
  })
  @ApiNotFoundResponse({
    description: 'User id not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    toCustomer: ObjectId,
  ): Promise<Notification> {
    return this.notificationService.createNotification(
      createNotificationDto,
      toCustomer,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Notifications Of User' })
  @ApiOkResponse({
    description: 'The notifications has been successfully retrieved.',
    type: [Notification],
  })
  @ApiNotFoundResponse({
    description: 'No Notification found in the repository.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  getNotificationsOfUser(@GetUser() user: User): Promise<Notification[]> {
    return this.notificationService.getNotificationOfUser(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Notifications Of User by notification_id' })
  @ApiOkResponse({
    description: 'Update Notification Successfully.',
    type: Notification,
  })
  @ApiNotFoundResponse({
    description: 'Notification not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Patch()
  updateNotificationOfUser(
    @GetUser() user: User,
    @Body('notification_id') notification_id: string,
  ): Promise<Notification> {
    return this.notificationService.updateNotification(user, notification_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update All Notification Of User' })
  @ApiOkResponse({
    description: 'Update Notification Successfully.',
    type: [Notification],
  })
  @ApiNotFoundResponse({
    description: 'No Notification found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Put('all')
  updateAllNotificationOfUser(@GetUser() user: User): Promise<Notification[]> {
    return this.notificationService.updateAllNotification(user);
  }
}
