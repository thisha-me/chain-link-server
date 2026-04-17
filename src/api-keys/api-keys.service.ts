import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ApiKey, ApiKeyDocument } from './schemas/api-key.schema';
import { CreateApiKeyDto } from './dto/api-key.dto';
import { NamespacesService } from '../namespaces/namespaces.service';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
    private namespacesService: NamespacesService,
  ) {}

  async createApiKey(userId: string, createDto: CreateApiKeyDto): Promise<{ rawKey: string }> {
    const { namespace } = createDto;

    const ownsNamespace = await this.namespacesService.verifyOwnership(userId, namespace);
    if (!ownsNamespace) {
      throw new UnauthorizedException(`User does not own or have access to namespace: ${namespace}`);
    }

    // Generate a secure random raw key
    const rawKey = crypto.randomBytes(32).toString('hex');
    
    // Hash the key using bcrypt before storing
    const salt = await bcrypt.genSalt(10);
    const hashedKey = await bcrypt.hash(rawKey, salt);

    const newApiKey = new this.apiKeyModel({
      hashedKey,
      user: new Types.ObjectId(userId),
      namespace,
    });

    await newApiKey.save();

    return { rawKey };
  }

  async validateApiKey(rawKey: string, namespace: string): Promise<boolean> {
    // Find all active api keys for the given namespace
    const apiKeys = await this.apiKeyModel.find({ namespace, isActive: true });
    
    // We must compare the raw key against hashed keys
    for (const keyDoc of apiKeys) {
      const isValid = await bcrypt.compare(rawKey, keyDoc.hashedKey);
      if (isValid) {
        return true;
      }
    }
    return false;
  }
}
