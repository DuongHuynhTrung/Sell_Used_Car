import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './entities/slot.entity';
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
  create(@Body() createSlotDto: CreateSlotDto): Promise<Slot> {
    return this.slotService.create(createSlotDto);
  }

  @ApiOperation({ summary: 'Get All Slot' })
  @ApiCreatedResponse({
    description: 'Slot has been retrieved',
    type: [Slot],
  })
  @ApiNotFoundResponse({
    description: 'User id not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Get()
  findAll(): Promise<Slot[]> {
    return this.slotService.findAll();
  }

  @Get(':licensePlate/:date')
  findOne(
    @Param('licensePlate') licensePlate: string,
    @Param('date') date: Date,
  ): Promise<Slot> {
    return this.slotService.findOne(date, licensePlate);
  }

  @Delete()
  remove(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.remove(createSlotDto);
  }
}
