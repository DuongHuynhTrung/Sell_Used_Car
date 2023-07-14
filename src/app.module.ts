import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { SlotModule } from './slot/slot.module';
import { RolesGuard } from './auth/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { Slot } from './slot/entities/slot.entity';
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
        entities: [User, Car, Slot],
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    CarModule,
    SlotModule,
  ],
})
export class AppModule {}
