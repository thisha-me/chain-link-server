import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeysService } from '../../api-keys/api-keys.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const namespace =
      request.headers['x-namespace'] ||
      request.params.namespace ||
      request.body.namespace ||
      request.query.namespace;

    if (!apiKey) {
      throw new UnauthorizedException(
        'API key is missing from headers (x-api-key)',
      );
    }

    if (!namespace) {
      throw new UnauthorizedException(
        'Namespace is required but not found in request',
      );
    }

    const isValid = await this.apiKeysService.validateApiKey(apiKey, namespace);

    if (!isValid) {
      throw new UnauthorizedException(
        'Invalid API Key for the requested namespace',
      );
    }

    return true;
  }
}
