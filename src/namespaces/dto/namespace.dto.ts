import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNamespaceDto {
  @ApiProperty({ example: 'my-app-prod', description: 'Globally unique name for the namespace (alphanumeric and dashes only)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Namespace can only contain alphanumeric characters and dashes' })
  name: string;
}
