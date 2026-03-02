import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FabricRegistryService } from '../services/fabric-registry.service';
import {
  FabricSetRecordDto,
  FabricGetRecordDto,
} from '../dto/fabric-registry.dto';

@ApiTags('Fabric Registry')
@Controller('fabric-registry')
export class FabricRegistryController {
  constructor(private readonly fabricRegistryService: FabricRegistryService) {}

  @Post('record')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Set a record on Hyperledger Fabric',
    description: 'Writes a key-value record to the Registry contract',
  })
  @ApiResponse({ status: 201, description: 'Record successfully created' })
  @ApiResponse({ status: 500, description: 'Blockchain transaction failed' })
  async setRecord(@Body() dto: FabricSetRecordDto) {
    return this.fabricRegistryService.setRecord(dto);
  }

  @Get('record')
  @ApiOperation({
    summary: 'Get a record from Hyperledger Fabric',
    description: 'Reads a key-value record from the Registry contract',
  })
  @ApiResponse({ status: 200, description: 'Record retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 500, description: 'Blockchain transaction failed' })
  async getRecord(@Query() dto: FabricGetRecordDto) {
    return this.fabricRegistryService.getRecord(dto);
  }
}
