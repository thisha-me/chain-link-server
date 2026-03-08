import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import {
  SupportedChain,
  SetRecordResponse,
  GetRecordResponse,
  RecordExistsResponse,
} from '../../common';
import { RegistryService } from '../services';
import { SetRecordDto } from '../dto/set-record.dto';
import { GetRecordDto } from '../dto/get-record.dto';

@ApiTags('Registry')
@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Post('record')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Set a record on-chain',
    description:
      'Writes a key-value record to the UniversalRegistry contract on the specified chain',
  })
  @ApiBody({ type: SetRecordDto })
  @ApiResponse({
    status: 201,
    description: 'Record successfully created',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        transactionHash: { type: 'string', example: '0x...' },
        chain: { type: 'string', example: 'polygon-amoy' },
        chainId: { type: 'number', example: 80002 },
        namespace: { type: 'string', example: 'my-namespace' },
        key: { type: 'string', example: 'my-key' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  @ApiResponse({ status: 500, description: 'Blockchain transaction failed' })
  async setRecord(@Body() dto: SetRecordDto): Promise<SetRecordResponse> {
    return this.registryService.setRecord(dto);
  }

  @Get('record')
  @ApiOperation({
    summary: 'Get a record from chain',
    description:
      'Reads a key-value record from the UniversalRegistry contract on the specified chain',
  })
  @ApiQuery({
    name: 'chain',
    enum: SupportedChain,
    description: 'Target blockchain network',
  })
  @ApiQuery({
    name: 'namespace',
    type: String,
    description: 'Namespace identifier (UTF-8 string)',
  })
  @ApiQuery({
    name: 'key',
    type: String,
    description: 'Key identifier (UTF-8 string)',
  })
  @ApiResponse({
    status: 200,
    description: 'Record retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        chain: { type: 'string', example: 'polygon-amoy' },
        chainId: { type: 'number', example: 80002 },
        namespace: { type: 'string', example: 'my-namespace' },
        key: { type: 'string', example: 'my-key' },
        value: { type: 'string', example: 'Hello World' },
        valueHex: { type: 'string', example: '0x48656c6c6f20576f726c64' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async getRecord(@Query() dto: GetRecordDto): Promise<GetRecordResponse> {
    return this.registryService.getRecord(dto);
  }

  @Get('exists')
  @ApiOperation({
    summary: 'Check if a record exists',
    description:
      'Checks whether a record exists in the UniversalRegistry contract on the specified chain',
  })
  @ApiQuery({
    name: 'chain',
    enum: SupportedChain,
    description: 'Target blockchain network',
  })
  @ApiQuery({
    name: 'namespace',
    type: String,
    description: 'Namespace identifier (UTF-8 string)',
  })
  @ApiQuery({
    name: 'key',
    type: String,
    description: 'Key identifier (UTF-8 string)',
  })
  @ApiResponse({
    status: 200,
    description: 'Existence check completed',
    schema: {
      type: 'object',
      properties: {
        chain: { type: 'string', example: 'polygon-amoy' },
        chainId: { type: 'number', example: 80002 },
        namespace: { type: 'string', example: 'my-namespace' },
        key: { type: 'string', example: 'my-key' },
        exists: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async recordExists(
    @Query() dto: GetRecordDto,
  ): Promise<RecordExistsResponse> {
    return this.registryService.recordExists(dto);
  }
}
