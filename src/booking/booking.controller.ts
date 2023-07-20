import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { RoleEnum } from 'src/user/enum/role.enum';
import { Roles } from 'src/auth/role.decorator';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Booking } from './entities/booking.entity';

@ApiTags('Booking')
@UseGuards(JwtGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new Booking' })
  @ApiCreatedResponse({
    description: 'Created Booking object as response',
    type: Booking,
  })
  @ApiBadRequestResponse({
    description: 'Slot has already booked.',
  })
  @ApiNotFoundResponse({
    description: 'Could not find car with licensePlate.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Post()
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Booking' })
  @ApiOkResponse({
    description: 'Bookings Of User/Website has been retrieved.',
    type: [Booking],
  })
  @ApiNotFoundResponse({
    description: 'No bookings found in the repository.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  getAllBooking(@GetUser() user: User) {
    return this.bookingService.findAllBookings(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel Booking by BookingId' })
  @ApiBody({
    description: 'Booking Id',
    type: 'string',
    examples: {
      booking_id: {
        value: {
          booking_id: '64b564311030516becb4dbc4',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Booking Of User has been retrieved.',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to cancel this booking',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch()
  cancelBookingStatus(
    @GetUser() user: User,
    @Body('booking_id') booking_id: string,
    @Body('cancelNote') cancelNote: string,
  ): Promise<Booking> {
    return this.bookingService.cancelBookingStatus(
      user,
      booking_id,
      cancelNote,
    );
  }
}
