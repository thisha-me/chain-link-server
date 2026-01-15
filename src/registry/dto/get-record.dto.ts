import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SupportedChain } from '../../common';

export class GetRecordDto {
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
}
