import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SupportedChain } from '../../common';

export class SetRecordDto {
  @ApiProperty({
    enum: SupportedChain,
    example: SupportedChain.POLYGON_AMOY,
    description: 'Target blockchain network',
  })
  @IsEnum(SupportedChain)
  @IsNotEmpty()
  chain: SupportedChain;

  @ApiProperty({
    example: 'my-namespace',
    description: 'Namespace identifier (UTF-8 string, will be hashed in backend)',
  })
  @IsString()
  @IsNotEmpty()
  namespace: string;

  @ApiProperty({
    example: 'my-key',
    description: 'Key identifier (UTF-8 string, will be hashed in backend)',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: 'Hello World',
    description: 'Value to store (UTF-8 string or hex-encoded bytes)',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: false,
    description: 'Whether the record should be immutable after creation',
  })
  @IsBoolean()
  immutable: boolean;
}
