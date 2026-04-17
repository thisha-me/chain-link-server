import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NamespacesService } from './namespaces.service';
import { CreateNamespaceDto } from './dto/namespace.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@ApiTags('Namespaces')
@ApiBearerAuth('JWT-auth')
@Controller('namespaces')
@UseGuards(JwtAuthGuard)
export class NamespacesController {
  constructor(private readonly namespacesService: NamespacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new globally unique namespace' })
  @ApiResponse({ status: 201, description: 'Namespace successfully created with a unique UUID.' })
  @ApiResponse({ status: 409, description: 'Namespace name is already taken.' })
  async create(@Request() req: RequestWithUser, @Body() createNamespaceDto: CreateNamespaceDto) {
    return this.namespacesService.create(req.user.userId, createNamespaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all namespaces owned by the authenticated developer' })
  @ApiResponse({ status: 200, description: 'Returns a list of namespaces.' })
  async findAll(@Request() req: RequestWithUser) {
    return this.namespacesService.findByUser(req.user.userId);
  }
}
