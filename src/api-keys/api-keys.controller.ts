import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/api-key.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@ApiTags('API Keys')
@ApiBearerAuth('JWT-auth')
@Controller('api-keys')
@UseGuards(JwtAuthGuard)
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @ApiOperation({ summary: 'Generate a new API key for a given namespace' })
  @ApiResponse({ status: 201, description: 'Raw API Key generated successfully (ONLY SHOWN ONCE).' })
  @ApiResponse({ status: 401, description: 'Unauthorized or invalid namespace access.' })
  async createApiKey(@Request() req: RequestWithUser, @Body() createApiKeyDto: CreateApiKeyDto) {
    // req.user is populated by JwtAuthGuard with { userId, email }
    return this.apiKeysService.createApiKey(
      req.user.userId,
      createApiKeyDto
    );
  }
}
