import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}
  async createNotification(
    createNotificationDto: CreateNotificationDto,
    toCustomer: ObjectId,
  ): Promise<Notification> {
    try {
      const notification = this.notificationRepository.create(
        createNotificationDto,
      );
      if (!notification) {
        throw new InternalServerErrorException(
          'Something went wrong when creating notification',
        );
      }
      notification.toCustomer = toCustomer;
      notification.newNotification = true;

      await this.notificationRepository.save(notification);
      return notification;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getNotificationOfUser(user: User): Promise<Notification[]> {
    try {
      const notifications = await this.notificationRepository.find({
        where: {
          toCustomer: user._id,
        },
      });
      if (!notifications || notifications.length === 0) {
        throw new NotFoundException(
          `No Notification found for ${user.fullName}`,
        );
      }
      return notifications;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateNotification(
    user: User,
    notification_id: string,
  ): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOneBy({
        toCustomer: user._id,
        _id: new ObjectId(notification_id),
      });
      if (!notification) {
        throw new NotFoundException(`Not found ${notification_id}`);
      }
      notification.newNotification = false;
      await this.notificationRepository.save(notification);

      return notification;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateAllNotification(user: User): Promise<Notification[]> {
    try {
      const notifications = await this.notificationRepository.find({
        where: {
          toCustomer: user._id,
        },
      });
      if (!notifications || notifications.length === 0) {
        throw new NotFoundException(
          `No Notification found for ${user.fullName}`,
        );
      }
      notifications.forEach(
        (notification) => (notification.newNotification = false),
      );
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
