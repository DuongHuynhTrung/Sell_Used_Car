import { CreateSlotDto } from 'src/slot/dto/create-slot.dto';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SlotService } from './slot.service';
import { Slot } from './entities/slot.entity';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GetSlotLicensePlateDateDto } from './dto/get-slot-licensePlate-date.dto';

@ApiTags('Slot')
@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @ApiOperation({ summary: 'Create new Slot' })
  @ApiCreatedResponse({
    description: 'Created slot object as response',
    type: Slot,
  })
  @ApiBadRequestResponse({
    description: 'Date must equal or after Now.',
  })
  @ApiNotFoundResponse({
    description: 'User id not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post()
  createSlot(@Body() createSlotDto: CreateSlotDto): Promise<Slot> {
    return this.slotService.createSlot(createSlotDto);
  }

  @ApiOperation({ summary: 'Get All Slot' })
  @ApiCreatedResponse({
    description: 'Slot has been retrieved',
    type: [Slot],
  })
  @ApiNotFoundResponse({
    description: 'No slot Found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAllSlot(): Promise<Slot[]> {
    return this.slotService.findAllSlot();
  }

  @ApiOperation({ summary: 'Get a slot by License Plate and Date' })
  @ApiOkResponse({
    description: 'The Slot has been successfully retrieved.',
    type: Slot,
  })
  @ApiNotFoundResponse({
    description: 'Slot not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get('/:licensePlate/:date')
  getSlotByLicensePlateAndDate(
    @Param() getSlotLicensePlateDateDto: GetSlotLicensePlateDateDto,
  ): Promise<Slot> {
    return this.slotService.getSlotByLicensePlateAndDate(
      getSlotLicensePlateDateDto,
    );
  }

  @ApiOperation({ summary: 'Remove Slot' })
  @ApiOkResponse({
    description: 'Remove Slot Successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Slot not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Delete()
  removeSlot(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.removeSlot(createSlotDto);
  }
}
