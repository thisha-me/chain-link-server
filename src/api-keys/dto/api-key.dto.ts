import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApiKeyDto {
  @ApiProperty({ example: 'my-namespace', description: 'Namespace to generate an API key for' })
  @IsString()
  @IsNotEmpty()
  namespace: string;
}
