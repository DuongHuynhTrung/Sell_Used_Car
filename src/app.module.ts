import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { SlotModule } from './slot/slot.module';
import { Slot } from './slot/entities/slot.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DB_URI'),
        useNewUrlParser: true,
        logging: true,
        entities: [User, Car, Slot, Booking],
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    CarModule,
    SlotModule,
    BookingModule,
  ],
})
export class AppModule {}
