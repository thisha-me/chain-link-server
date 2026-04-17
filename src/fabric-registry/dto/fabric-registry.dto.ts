import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FabricSetRecordDto {
  @ApiProperty({
    description: 'Namespace for the record (optional, defaults to "default")',
    example: 'my-namespace',
  })
  @IsString()
  namespace: string;
  @ApiProperty({
    description: 'Key identifier (UTF-8 string)',
    example: 'my-key',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Value to store (UTF-8 string)',
    example: 'my-value',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class FabricGetRecordDto {
  @ApiProperty({
    description: 'Key identifier (UTF-8 string)',
    example: 'my-key',
  })
  @IsString()
  @IsNotEmpty()
  key: string;
}
