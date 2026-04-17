import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { BlockchainModule } from '../blockchain';
import { RegistryController } from './controllers';
import { RegistryService } from './services';
import { ApiKeysModule } from '../api-keys/api-keys.module';

@Module({
  imports: [ConfigModule, BlockchainModule, ApiKeysModule],
  controllers: [RegistryController],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
